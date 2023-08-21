import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const friends = [
        {
            id: 2,
            name: "Alice",
            surname: "James",
            profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio: "",
            email: "sds@yopmail.com"
        },
        {
            id: 3,
            name: "Bob",
            surname: "Walber",
            profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio: "",
            email: "sds@yopmail.com"
        },
        {
            id: 4,
            name: "Charlie",
            surname: "West",
            profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio: "",
            email: "sds@yopmail.com"
        },
        {
            id: 5,
            name: "Dave",
            surname: "Brown",
            profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio: "",
            email: "sds@yopmail.com"
        },
        {
            id: 6,
            name: "Eve",
            surname: "O-marley",
            profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio: "",
            email: "sds@yopmail.com"
        }
    ];
    const session = await getSession(req, res);
    const { user } = session;
    if (user) {
        var message = JSON.parse(req.body).message;
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
            var userNotifications= await userNotificationsRaw.json();
            message.id=userNotifications.data.uid;
            message.messageTo.name = message.messageTo.receiverUserName;
            message.isRead = false;
            message.createdUTC=userNotifications.data.createdAt;
            message.editedUTC=userNotifications.data.updatedAt;
            res.status(200).json({ message });
        }
        else
            res.status(400).json();
    }
    else {
        res.status(200).json({});
    }
});