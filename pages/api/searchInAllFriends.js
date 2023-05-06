const SearchInAllFriendsAction = (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode && body?.searchText?.trim().length>=1) {
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
                name:"Bobby",
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
        var searchResults =friends.filter(x=> 
            x.name.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())
            || x.surname.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase()
            || body.searchText.toLocaleLowerCase().includes(x.name.toLocaleLowerCase())
            || body.searchText.toLocaleLowerCase().includes(x.surname.toLocaleLowerCase())
            ));
       
            res.status(200).json(searchResults);
    }
    else {
        res.status(400).json([]);
    }
  };
  export default SearchInAllFriendsAction;