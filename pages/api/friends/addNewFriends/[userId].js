import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const modelData = JSON.parse(req.body);
    //Check for different statuses to send proper payload
    const session = await getSession(req, res);
    const { user } = session;

    if (user && modelData.friendUserId) {
        const friends = [];
        var addedNewFriendRaw = await fetch(`${process.env.DESKREE_BASE_URL}/userFollowers`,
            {
                method: "post",
                body: JSON.stringify(
                    {
                        followingUserId: user.sub.split("|")[1],
                        followersUserId: modelData.friendUserId
                    }
                ),
                headers: {
                    'content-type': 'application/json'
                }
            }
        );
        if (addedNewFriendRaw.status == 200) {
            var myFriendsRaw = await fetch(`${process.env.baseUri}user/Friends/${user.sub.split("|")[1]}`, {
                method: "GET",
                headers: {
                    'cookie': `${req.headers.cookie}`,
                    'content-type': 'text/plain;charset=UTF-8'
                }
            });
            if (myFriendsRaw.status == 200) {
                res.status(200).json(await myFriendsRaw.json());
            }
            else
                res.status(400).json([]);
        }
        else {
            res.status(400).json([]);
        }
    }
    else {
        res.status(400).json([]);
    }
});