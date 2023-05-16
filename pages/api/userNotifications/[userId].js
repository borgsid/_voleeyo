const UserNotificationsAction = async (req, res) => {
    console.log("req",req.query.userId)
    //Check for different statuses to send proper payload
    if (req.query?.userId!=undefined) {
        const userNotifications={
            inbox:[
            {
                id:5,
                messageFrom:{
                    id:99,
                    name:"Marco",
                    surname:"polo",
                    isFollowing:true
                },
                messageTo:{
                    id:1, 
                    isFollowing:true
                },
                message:"Hello there heard about LA2028?",
                isRead:false,
                userMessage:"",
                isInbox:true

            },
            {
                id:1,
                messageFrom:{
                    id:87,
                    name:"Jessy",
                    surname:"James",
                    isFollowing:false
                },
                messageTo:{
                    id:1, 
                    isFollowing:false
                },
                message:"Wanna be friends",
                isRead:true,
                userMessage:"",
                isInbox:true
            },
            {
                id:2,
                messageFrom:{
                    id:7, 
                    name:"Dr. Mar",
                    surname:"Walber",
                    isFollowing:false
                },
                messageTo:{
                    id:1, 
                    isFollowing:true
                },
                message:"What you up to tonight?",
                isRead:true,
                userMessage:"Not much, wanna go see the movies?",
                isInbox:true
            }],
            sent:[]
        }
        res.status(200).json(userNotifications);
      }
      else {
        res.status(400).json({});
      }
  };
  export default UserNotificationsAction;