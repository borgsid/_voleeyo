const UserNotificationsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode) {
        const userNotifications=[
            {
                id:5,
                messageSender:{
                    id:99,
                    name:"Marco",
                    surname:"polo",
                    isFollowing:true
                },
                message:"Hello friend",
                isRead:false,
                userReply:""
            },
            {
                id:1,
                messageSender:{
                    id:87,
                    name:"Jessy",
                    surname:"James",
                    isFollowing:false
                },
                message:"Wanna be friends",
                isRead:true,
                userReply:""
            },
            {
                id:2,
                messageSender:{
                    id:7, 
                    name:"Dr. Mar",
                    surname:"Walber",
                    isFollowing:false
                },
                message:"What you up to tonight?",
                isRead:true,
                userReply:"Not much, wanna go see the movies?"
            }
        ]
        res.status(200).json(userNotifications);
      }
      else {
        res.status(400).json([]);
      }
  };
  export default UserNotificationsAction;