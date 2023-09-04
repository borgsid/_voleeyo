import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const body = JSON.parse(req.body);
    const session = await getSession(req, res);
    const { user } = session;
    if (req.query?.userId) {
        const friends = [];

        const queryString = `?where=[{"attribute":"userId","operator":"!=","value":"${req.query?.userId}"}]`;
        const allUsersRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers${queryString}`);
        if (allUsersRaw.status == 200) {
            var allUsers = await allUsersRaw.json();
            if (allUsers.meta?.total > 0) {
                allUsers.data.forEach((x, index) => {
                    friends.push({
                        id: index + 1,
                        userId: x.attributes.userId,
                        name: x.attributes.name,
                        surname: x.attributes.surname,
                        profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                        bio: x.attributes.bio
                    });
                });
            }
        }

        var searchResults = friends.filter(x =>
            x.name.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase())
            || x.surname.toLocaleLowerCase().includes(body.searchText.toLocaleLowerCase()
                || body.searchText.toLocaleLowerCase().includes(x.name.toLocaleLowerCase())
                || body.searchText.toLocaleLowerCase().includes(x.surname.toLocaleLowerCase())
            ));

        //Can be done in the api filter, but who cares see the query chaining in api/user/friends ln 15
        var myFriendsRaw = await fetch(`${process.env.baseUri}/user/Friends/${user.sub.split("|")[1]}`, {
            method: "Get",
            headers: {
                'cookie': `${req.headers.cookie}`,
                'content-type': 'application/json'
            }
        });
        if (myFriendsRaw.status == 200) {
            var myFriends = await myFriendsRaw.json();
            var myFriendsUserIds = myFriends.following.map(x => x.userId);
            var clearExistingFriends = searchResults.filter(x => !myFriendsUserIds.includes(x.userId));
            res.status(200).json(clearExistingFriends);
        }
        else
            res.status(400).json([]);
    }
    else {
        res.status(400).json([]);
    }
});