import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const UtcDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}Z`;
  const { user } = session;
  if (user) {
    var queryString = `?where=[{"attribute":"userId","operator":"=","value":"${req.query?.userId}"}]`;
    var currentUserRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers${queryString}`, {
      method: "get",
    });
    if (currentUserRaw.status == 200) {
      const currentUser = (await currentUserRaw.json()).data[0];
      var logicDeleteUserRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers/${currentUser.uid}`, {
        method: "PATCH",
        body: JSON.stringify({
          deletionUTCdate: UtcDate,
          isActive: false
        }),
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      });
      res.status(logicDeleteUserRaw.status).json(`User is ${logicDeleteUserRaw.status!=200?"not ":""}deleted`);

    }
    else
      res.status(400).json({});
  }
  else
    res.status(400).json({});
}); 