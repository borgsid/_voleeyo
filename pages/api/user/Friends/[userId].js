import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const session = await getSession(req, res);
    const { user } = session;
    if (user) {
        const friends = []
        const queryString = `?where=[{"attribute":"followedUserId","operator":"=","value":"${req.query?.userId}"}]`;
        const myfriendsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/userFollowers${queryString}`);
        if (myfriendsRaw.status == 200) {
            var myfriends = await myfriendsRaw.json();
            if (myfriends.meta?.total > 0) {
                var queryStringVOlunteers = [];
                myfriends.data?.map(x =>
                    queryStringVOlunteers.push({ attribute: "userId", operator: "=", value: `${x.attributes.followingUserId}` })
                );
                const userDetailRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers?where=${JSON.stringify(queryStringVOlunteers)}`);
                if (userDetailRaw.status == 200) {
                    var userDetail = await userDetailRaw.json();
                    if (userDetail.meta?.total > 0) {
                        myfriends.data?.forEach((x, index) => {
                            var currentTempUser = userDetail.data.find(d => d.attributes.userId == x.attributes.followingUserId);
                            friends.push({
                                id: index + 1,
                                userId: currentTempUser.attributes.userId,
                                name: currentTempUser.attributes.name,
                                surname: currentTempUser.attributes.surname,
                                profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                                bio: currentTempUser.attributes.bio
                            });
                        })

                    }
                }
            }
        }
        res.status(200).json(friends);
    }
    else {
        res.status(400).json([]);
    }
});