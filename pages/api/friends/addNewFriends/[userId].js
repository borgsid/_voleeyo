import { withApiAuthRequired ,getSession} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    const session = await getSession(req,res);
    const {user} = session;
    const allUsers=[
        {
            id:2,
            name:"Alice",
            surname:"James",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com",
            isFollowing:false
        },
        {
            id:3,
            name:"Bobby",
            surname:"Walber",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com",isFollowing:false
        },
        {
            id:4,
            name:"Charlie",
            surname:"West",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com",
            isFollowing:false
        },
        {
            id:5,
            name:"Dave",
            surname:"Brown",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com",
            isFollowing:false
        },
        {
            id:6,
            name:"Eve",
            surname:"O-marley",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com",
            isFollowing:false
        }
    ]
    if (user&& body.friendId) {
        const friends=[];
        var myFriendsRaw= await fetch(`${process.env.baseUri}user/Friends/${user.sub.split("|")[1]}`,{
            method: "POST",
            headers: {
                'cookie': `${req.headers.cookie}`,
                'content-type': 'text/plain;charset=UTF-8'
            }
        });
        if(myFriendsRaw.status==200)
        {
            friends.push(...(await myFriendsRaw.json()));
            var myNewFriend= allUsers.find(x=> x.id==body.friendId);
            myNewFriend.isFollowing=true;
            friends.push(myNewFriend)
            res.status(200).json(friends);
        }
        else
            res.status(400).json([]);
    }
    else {
        res.status(400).json([]);
    }
  });