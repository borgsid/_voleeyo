import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async (req, res) => {
    //Check for different statuses to send proper payload
    const session = await getSession(req, res);
    const { user } = session;
    if (user) {
        const friends = {
            following: [],
            followers: []
        }
        //TODO give it the instagram feel following and followed
        const userDetailRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers`);
        var userDetail = userDetailRaw.status == 200 ? await userDetailRaw.json() : undefined;

        var queryString = `?where=[{"attribute":"followingUserId","operator":"=","value":"${req.query?.userId}"}]`;
        const myfriendsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/userFollowers${queryString}`);
        var myFriendsIds=[];
        if (myfriendsRaw.status == 200) {
            var myfriends = await myfriendsRaw.json();
            if (myfriends.meta?.total > 0) {
                 myFriendsIds = myfriends.data.map(x => x.attributes.followersUserId);
                if (userDetail && userDetail.meta?.total > 0) {
                    userDetail.data?.map((x, index) => {
                        if (myFriendsIds.includes(x.attributes.userId)&&x.attributes?.isActive) {
                            friends.following.push({
                                id: index + 1,
                                userId: x.attributes.userId,
                                name: x.attributes.name,
                                surname: x.attributes.surname,
                                profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                                bio: x.attributes.bio,
                                f_uid: myfriends.data.find(f => f.attributes.followersUserId == x.attributes.userId)?.uid,
                                isFollowing:true
                            });
                        }
                    })

                }
            }
        }

        queryString = `?where=[{"attribute":"followersUserId","operator":"=","value":"${req.query?.userId}"}]`;
        const myfollowersRaw = await fetch(`${process.env.DESKREE_BASE_URL}/userFollowers${queryString}`);
        if (myfollowersRaw.status == 200) {
            var myfollowers = await myfollowersRaw.json();
            if (myfollowers.meta?.total > 0) {
                var myfollowersIds = myfollowers.data.map(x => x.attributes.followingUserId);
                if (userDetail && userDetail.meta?.total > 0) {
                    userDetail.data?.map((x, index) => {
                        if (myfollowersIds.includes(x.attributes.userId)&&x.attributes?.isActive) {
                            friends.followers.push({
                                id: index + 1,
                                userId: x.attributes.userId,
                                name: x.attributes.name,
                                surname: x.attributes.surname,
                                profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                                bio: x.attributes.bio,
                                f_uid: myfollowers.data.find(f => f.attributes.followingUserId == x.attributes.userId).uid,
                                isFollowing:myFriendsIds?.includes(x.attributes.userId) //checking if my followers follow me
                            });
                        }
                    })

                }
            }
        }
        res.status(200).json(friends);
    }
    else {
        res.status(400).json([]);
    }
});