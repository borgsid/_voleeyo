import { withApiAuthRequired ,getSession} from "@auth0/nextjs-auth0";

export default withApiAuthRequired( async (req, res) => {
    const friends=[
        {
            id:2,
            name:"Alice",
            surname:"James",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:3,
            name:"Bob",
            surname:"Walber",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:4,
            name:"Charlie",
            surname:"West",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:5,
            name:"Dave",
            surname:"Brown",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:6,
            name:"Eve",
            surname:"O-marley",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        }
    ];
    const body=JSON.parse(req.body);
    const session = await getSession(req,res);
    const {user} = session;
    if (user) {
        body.message.messageFrom={
            id:user.sub.split("|")[1],
            name:user.given_name,
            surname: user.given_surname
        }
        console.log("hahah",body.message.messageFrom)
        var messageTO= friends.find(x=> x.id== body.message.messageTo.id);
        body.message.messageTo.name=messageTO?.name;
        body.message.messageTo.surname=messageTO?.surname;
        body.message.isRead=false;
        body.message.id+=Math.floor(Math.random() * 100);
        res.status(200).json({message:body.message});
      }
      else {
        res.status(400).json({});
      }
  });