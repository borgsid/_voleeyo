import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req, res);
    const { user } = session;
    const myNotifications = {
        inbox: [],
        sent: []
    }
    if (user) {
        //get my inbox
        var queryString = `[{"attribute":"receiverUserId","operator":"=","value":"${req.query?.userId}"}]`;
        var linkVol = `${process.env.DESKREE_BASE_URL}/notifications?where=${queryString}`;
        const myInboxRaw = await fetch(linkVol, { method: "get" });
        //get sent
        queryString = `[{"attribute":"senderUserId","operator":"=","value":"${req.query?.userId}"}]`;
        var linkVol = `${process.env.DESKREE_BASE_URL}/notifications?where=${queryString}`;
        const mySentEmailRaw = await fetch(linkVol);
        var allUsersInbox = [];
        var allUsersSent = [];
        
        if (myInboxRaw.status == 200) {
            var myInbox = await myInboxRaw.json();
            //get users
            if (myInbox.meta.total > 0) {
                await Promise.all(
                    myInbox.data?.map(async (x) => {
                        var queryStringVolunteers = `[{ "attribute": "userId", "operator": "=", "value": "${x.attributes.senderUserId}" }]`;
                        var linkVol = `${process.env.DESKREE_BASE_URL}/volunteers?where=${queryStringVolunteers}`;
                        const userDetailRaw = await fetch(linkVol);
                        if(userDetailRaw.status==200){
                            const userDetail= await userDetailRaw.json();
                            allUsersInbox.push(
                                {
                                    userId: userDetail.data[0].attributes.userId,
                                    name: userDetail.data[0].attributes.name,
                                    surname: userDetail.data[0].attributes.surname
                                })
                        }
                    })
                );
                myInbox.data?.forEach(element => {
                    myNotifications.inbox.push(
                        {
                            id: element.uid,
                            messageFrom: {
                                id: element.attributes.senderUserId,
                                name: allUsersInbox.find(user => user.userId == element.attributes.senderUserId).name,
                                surname: allUsersInbox.find(user => user.userId == element.attributes.senderUserId).surname,
                                isFollowing: true
                            },
                            messageTo: {
                                id: req.query?.userId,
                                isFollowing: true
                            },
                            message: element.attributes.message,
                            isRead: element.attributes.isRead,
                            userMessage: element.attributes.reply,
                            isInbox: true,
                            createdUTC:element.attributes.createdAt,
                            editedUTC:element.attributes?.updatedAt
                        }
                    )
                    myNotifications.inbox.sort((a,b)=>{
                        if(new Date(a.createdUTC)>new Date(b.createdUTC))
                            return 1;
                            if(new Date(a.createdUTC)<new Date(b.createdUTC))
                            return -1;
                    })
                });
            }

        }
        if (mySentEmailRaw.status == 200) {
            var mySentEmail = await mySentEmailRaw.json();
            //get users
            if (mySentEmail.meta.total > 0) {
                await Promise.all(
                    mySentEmail.data?.map(async (x) => {
                        var queryStringVolunteers = `[{ "attribute": "userId", "operator": "=", "value": "${x.attributes.receiverUserId}"}]`;
                        var linkVol = `${process.env.DESKREE_BASE_URL}/volunteers?where=${queryStringVolunteers}`;
                        const userDetailRaw = await fetch(linkVol,{method:"get"});
                        if(userDetailRaw.status==200){
                            const userDetail= await userDetailRaw.json();
                            if(userDetail.meta.total>0)
                                allUsersSent.push(
                                {
                                    userId: userDetail.data[0].attributes.userId,
                                    name: userDetail.data[0].attributes.name,
                                    surname: userDetail.data[0].attributes.surname
                                })
                        }
                    })
                );
                mySentEmail.data?.forEach(element => {
                    myNotifications.sent.push(
                        {
                            id: element.uid,
                            isRead: element.attributes.isRead,
                            message: element.attributes.reply,
                            messageTo: {
                                id: element.attributes.senderUserId,
                                name: allUsersSent.find(user => user.userId == element.attributes.receiverUserId)?.name,
                                surname: allUsersSent.find(user => user.userId == element.attributes.receiverUserId)?.surname,
                                isFollowing: true
                            },
                            messageFrom: {
                                id: req.query?.userId,
                                isFollowing: true
                            },
                            userMessage: element.attributes.message,
                            isInbox: false,
                            createdUTC:element.attributes.createdAt,
                            editedUTC:element.attributes?.updatedAt
                        }
                    )
                    myNotifications.sent.sort((a,b)=>{
                        if(new Date(a.createdUTC)>new Date(b.createdUTC))
                            return 1;
                            if(new Date(a.createdUTC)<new Date(b.createdUTC))
                            return -1;
                    })
                });

            }
        }
        res.status(200).json(myNotifications);
    }
    else
        res.status(400).json({});
});