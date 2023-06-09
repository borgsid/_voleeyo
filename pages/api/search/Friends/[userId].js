import { withApiAuthRequired ,getSession} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const body= JSON.parse(req.body);
    const session= await getSession(req,res);
    const {user} =session;
    if (req.query?.userId) {
        const friends=[
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
        var searchResults =friends.filter(x=> 
            x.name.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())
            || x.surname.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase()
            || body.searchText.toLocaleLowerCase().includes(x.name.toLocaleLowerCase())
            || body.searchText.toLocaleLowerCase().includes(x.surname.toLocaleLowerCase())
            ));
        
        var myFriendsRaw= await fetch(`${process.env.baseUri}/user/Friends/${user.sub.split("|")[1]}`,{
            method: "Get",
            headers: {
                'cookie': `${req.headers.cookie}`,
                'content-type': 'text/plain;charset=UTF-8'
            }
        });
        if(myFriendsRaw.status==200)
        {
            var myFriendsIds= (await myFriendsRaw.json()).map(x=> x.id);
            var clearExistingFriends=searchResults.filter(x=> !myFriendsIds.includes(x.id));
            res.status(200).json(clearExistingFriends);
        }
        else
            res.status(400).json([]);
    }
    else {
    res.status(400).json([]);
    }
  });