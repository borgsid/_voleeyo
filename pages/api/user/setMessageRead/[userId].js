import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req, res)
    const { user } = session;
    if (user) {
        const message = JSON.parse(req.body).message;
        //Check for different statuses to send proper payload
        var linkNotifications = `${process.env.DESKREE_BASE_URL}/notifications/${message.id}`;
        const userNotificationsRaw = await fetch(linkNotifications,
           { 
            method: "post",
            headers:{
                "content-type": "application/json; charset=utf-8"
            },
            body:JSON.stringify({
                isRead: message.isRead,
                reply: message.userMessage,
                message: message.message,
                receiverUserId: message.messageTo.id,
                senderUserId: message.messageFrom.id,
            })
        })
        if (userNotificationsRaw.status == 200){
            res.status(200).json();
        }
        else
        {
            res.status(400).json();
        }
    }
    else {
        res.status(400).json();
    }
});