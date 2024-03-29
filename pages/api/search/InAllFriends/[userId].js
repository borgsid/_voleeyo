import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    if (req.query?.userId) {
        const body = JSON.parse(req.body);
        var friends = [];
        const baseUri = process.env.baseUri;
        const url = `${baseUri}user/Friends/${req.query?.userId}`;
        var friendsRaw = await fetch(url, {
            method: "GET",
            headers: {
                'cookie': `${req.headers.cookie}`,
                'content-type': 'text/plain;charset=UTF-8'
            }
        });
        if (friendsRaw.status == 200)
            {
                var resp =await friendsRaw.json();
                friends = [... resp["following"]].concat([...resp["followers"]])
                friends=Array.from(new Set(friends.map(obj => obj.userId)))
                        .map(userId => {
                            return friends.find(obj => obj.userId === userId);
                        }); 
            }
        var searchResults = friends.filter(x =>
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
});