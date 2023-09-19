import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import nodemailer from 'nodemailer';
export default withApiAuthRequired(async (req, res) => {

    const session = await getSession(req, res);
    const message = JSON.parse(req.body).message;
    const { user } = session;
    const to = "sydneylukee@gmail.com";

    const notifyUser = async () => {
        const hostEmail = process.env.Host_Email;
        const hostPSW = process.env.Host_PWS;
        const subject = `[Voleeyo] New notification from ${message?.messageFrom?.surname}`; //name is joined with surname
        const text = message?.userMessage + `\n\r login in Voleeyo to reply to the message!`;
        const html = `
                <html>
                    <head>
                    <title>${subject}</title>
                    </head>
                    <body>
                    <div class="userMessage">
                        ${message.userMessage}
                    </div>
                    <p>Login to Voleeyo to reply to the message!</p>
                    <center>
                        <a style=" 
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 0.25rem;
                        font-size: 1rem;
                        font-weight: bold;
                        color: white;
                        background-color: rgb(225, 215, 172);" href='${process.env.AUTH0_BASE_URL}'>Login</a>
                    </center>
                    </body>
                </html>
                `;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: hostEmail,
                pass: hostPSW
            }
        });
        const mailOptions = {
            from: hostEmail,
            to,
            subject,
            // text
            html
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }
    if (user) {
        
        //Check for different statuses to send proper payload
        var linkNotifications = `${process.env.DESKREE_BASE_URL}/notifications`;
        const userNotificationsRaw = await fetch(linkNotifications,
            {
                method: "post",
                headers: {
                    "content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    isRead: message.isRead,
                    message: message.userMessage,
                    receiverUserId: message.messageTo.id,
                    senderUserId: req.query?.userId,
                })
            })
        if (userNotificationsRaw.status == 200) {
            await notifyUser();
            var userNotifications = await userNotificationsRaw.json();
            message.id = userNotifications.data.uid;
            message.messageTo.name = message.messageTo.receiverUserName;
            message.isRead = false;
            message.createdUTC = userNotifications.data.createdAt;
            message.editedUTC = userNotifications.data.updatedAt;
            res.status(200).json({ message });
        }
        else
            res.status(400).json();
    }
    else {
        res.status(200).json({});
    }
});