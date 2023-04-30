const SearchFriendsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode && body?.searchText?.trim().length>=1) {
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
            },
            {
                id:3,
                name:"Charlie",
                surname:"West",
                profilePic:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                bio:"",
                email:"sds@yopmail.com"
            },
            {
                id:4,
                name:"Eve",
                surname:"O'marley",
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
            }
        ]
        var searchResults =friends.filter(x=> x.name.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())|| x.surname.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase()));
        var myFriendsRaw= await fetch(`${process.env.baseUri}userFriends`,{
            method: "POST",
            body:JSON.stringify({secretCode:body.secretCode})
        });
        if(myFriendsRaw.status==200)
        {
            var myFriendsIds= (await myFriendsRaw.json()).map(x=> x.id);
            var clearExistingFriends=searchResults.filter(x=> !myFriendsIds.includes(x.id));
            res.status(200).json(clearExistingFriends);
        }
    }
    else {
    res.status(400).json([]);
    }
  };
  export default SearchFriendsAction;