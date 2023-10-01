import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req, res)
    const { user } = session;
    if (user) {
        const message = JSON.parse(req.body);
        var linkNotifications = `${process.env.DESKREE_BASE_URL}/notifications/${message.id}`;
        var bodyBuilder = {};
        switch(message.notificationToWhom){
            case "sender":
                bodyBuilder={
                    isSenderDelete:true
                };
                break;
            default:
            case "receiver":
                bodyBuilder={
                    isReceiverDelete:true
                };
            break;
        };
        const userNotificationsRaw = await fetch(linkNotifications,
           { 
            method: "PATCH",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
           body:JSON.stringify(
                bodyBuilder
            )
        })
        if (userNotificationsRaw.status == 200){
            res.status(200).json();
        }
        else
        {
            res.status(400).json(JSON.stringify());
        }
    }
    else {
        res.status(400).json();
    }
});