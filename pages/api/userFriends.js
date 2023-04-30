const UserFriendsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode) {
        const friends=[
            {
                id:1,
                name:"Alice",
                surname:"James",
                profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                bio:"",
                email:"sds@yopmail.com"
            },
            {
                id:2,
                name:"Bob",
                surname:"Walber",
                profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                bio:"",
                email:"sds@yopmail.com"
            }
        ]
        res.status(200).json(friends);
      }
      else {
        res.status(400).json([]);
      }
  };
  export default UserFriendsAction;