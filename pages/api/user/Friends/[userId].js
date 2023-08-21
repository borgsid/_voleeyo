import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const session = await getSession(req, res);
    const { user } = session;
    if (user) {
        const friends = []
        //TODO give it the instagram feel following and followed
        const queryString = `?where=[{"attribute":"followingUserId","operator":"=","value":"${req.query?.userId}"}]`;
        const myfriendsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/userFollowers${queryString}`);
        if (myfriendsRaw.status == 200) {
            var myfriends = await myfriendsRaw.json();
            if (myfriends.meta?.total > 0) {
                var myFriendsIds = myfriends.data.map(x => x.attributes.followedUserId);
                const userDetailRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers`);
                if (userDetailRaw.status == 200) {
                    const userDetail = await userDetailRaw.json();
                    if (userDetail.meta?.total > 0) {
                        userDetail.data?.map((x, index) => {
                            if(myFriendsIds.includes(x.attributes.userId))
                            {
                                friends.push({
                                    id: index + 1,
                                    userId: x.attributes.userId,
                                    name: x.attributes.name,
                                    surname: x.attributes.surname,
                                    profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                                    bio: x.attributes.bio,
                                    f_uid:myfriends.data.find(f=> f.attributes.followedUserId==x.attributes.userId).uid
                                });
                            }
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