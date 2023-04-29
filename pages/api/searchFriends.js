const SearchFriendsAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode && body?.searchText.length>=3) {
        const friends=[
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
        res.status(200).json(friends.filter(x=> x.name.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())|| x.surname.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())));
      }
      else {
        res.status(400).json([]);
      }
  };
  export default SearchFriendsAction;