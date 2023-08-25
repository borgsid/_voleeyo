import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  // Check for different statuses to send proper payload
  const session = await getSession(req, res);
  const { user } = session;
  if (!user)
    res.status(400).json({});
  else {
    var queryString = `?where=[{"attribute":"userId","operator":"=","value":"${req.query?.userId}"}]`;
    var currentUserRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers${queryString}`, {
      method: "get",
    });
    if (currentUserRaw.status == 200) {
      const currentUserEntries = await currentUserRaw.json();
      if (currentUserEntries.data.length > 0) {
        const currentUserData = currentUserEntries.data[0].attributes;
        var currentUserModel = {
          name: currentUserData.name,
          surname: currentUserData.surname,
          bio: currentUserData.bio,
          v_uid:currentUserEntries.data[0].uid,
          isActive:currentUserData.isActive
        }
        res.status(200).json(currentUserModel);
      }
      else
        res.status(204).json();
    }
    else
      res.status(204).json();
  }
});
