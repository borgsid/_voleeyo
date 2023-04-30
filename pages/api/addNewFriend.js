const AddNewFriendsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    const allUsers=[
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
    ]
    if (process.env.log_in_key==body.secretCode&& body.friendId) {
        const friends=[];
        var myFriendsRaw= await fetch(`${process.env.baseUri}userFriends`,{
            method: "POST",
            body:JSON.stringify({secretCode:body.secretCode})
        });
        if(myFriendsRaw.status==200)
        {
            friends.push(...(await myFriendsRaw.json()));
            console.log("friends 1",friends)
            friends.push(allUsers.find(x=> x.id==body.friendId))
            console.log("friends 2",friends)
            res.status(200).json(friends);
        }
        else
            res.status(400).json([]);
    }
    else {
        res.status(400).json([]);
    }
  };
  export default AddNewFriendsAction;