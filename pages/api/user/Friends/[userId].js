import { withApiAuthRequired ,getSession} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const session = await getSession(req,res);
    const {user} =session;
    if (user) {
        const friends=[

            {
                id:2,
                name:"Alice",
                surname:"James",
                profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                bio:"",
                email:"sds@yopmail.com",
                isFollowing:true
            },
            {
                id:3,
                name:"Bob",
                surname:"Walber",
                profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                bio:"",
                email:"sds@yopmail.com",
                isFollowing:true
            }
        ]
        res.status(200).json(friends);
      }
      else {
        res.status(400).json([]);
      }
  });