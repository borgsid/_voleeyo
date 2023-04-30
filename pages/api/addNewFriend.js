const AddNewFriendsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    const allUsers=[
        {
            id:1,
            name:"Jessy",
            surname:"james",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:2,
            name:"Dr. Mar",
            surname:"Walber",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:3,
            name:"Saima",
            surname:"Al faja",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        },
        {
            id:4,
            name:"Deaton",
            surname:"Mally",
            profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            bio:"",
            email:"sds@yopmail.com"
        }
    ]
    if (process.env.log_in_key==body.secretCode) {
        const friends=[];
        var myFriendsRaw= await fetch(`${process.env.baseUri}userFriends`,{
            method: "POST",
            body:JSON.stringify({secretCode:body.secretCode})
        });
        if(myFriendsRaw.status==200)
        {
            friends.push(...(await myFriendsRaw.json()));
            friends.push(allUsers.find(x=> x.id==body.friendId))
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