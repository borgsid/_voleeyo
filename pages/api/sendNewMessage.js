const SendNewMessageActiion = async (req, res) => {
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
    var resp = await fetch(`${process.env.baseUri}checkSecret`,{
        method:"post",
        body:JSON.stringify({secretCode:body.secretCode})
    })
   
    var currentUser=  await resp.json();
    console.log("currentUser",currentUser)
    if (currentUser.status&& body.message!=undefined) {
        body.message.messageFrom={
            id:currentUser.id,
            name:currentUser.name,
            surname: currentUser.surname
        }
        var messageTO= friends.find(x=> x.id== body.message.messageTo.id);
        body.message.messageTo.name=messageTO?.name;
        body.message.messageTo.surname=messageTO?.surname;
        body.message.isRead=false;
        body.message.id+=100
        res.status(200).json({message:body.message});
      }
      else {
        res.status(400).json({});
      }
  };
  export default SendNewMessageActiion;