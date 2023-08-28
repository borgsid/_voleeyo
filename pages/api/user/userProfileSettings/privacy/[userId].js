import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const UtcDate = `${new Date().toISOString()}`; // Use ISO format for UTC date
  const { user } = session;

  if (user) {
    try {
      const queryString = `?where=[{"attribute":"userId","operator":"=","value":"${req.query?.userId}"}]`;
      const currentUserRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers${queryString}`, {
        method: "GET",
      });

      if (currentUserRaw.status === 200) {
        const currentUser = (await currentUserRaw.json()).data[0];

        // Logic to mark the user as inactive in your application's database
        const logicDeleteUserRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers/${currentUser.uid}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            deletionUTCdate: UtcDate,
            isActive: false
          })
        });
        if (logicDeleteUserRaw.status === 200) {
          // Fetch an access token for Auth0 Management API
          const tokenRaw = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json' // Correct content-type header
            },
            body: JSON.stringify({
              grant_type: 'client_credentials',
              client_id: process.env.AUTH0_M_M_CLIENT_ID,
              client_secret: process.env.AUTH0_M_M_CLIENT_SECRET,
              audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`
            })
          });
          if (tokenRaw.status == 200) {

            const token = await tokenRaw.json();

            var accesstoken = token.access_token;
            var bearer = token.token_type
            const resppRaw = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`, {
              method: "DELETE",
              // method: "PATCH",
              headers: {
                "content-type": "application/json",
                "Authorization": `${bearer} ${accesstoken}`,
              },
              // body: JSON.stringify({ blocked: true })
            });
            res.status(logicDeleteUserRaw.status).json(`User is ${resppRaw.status > 204 ? "not " : ""}deleted`);
          }
          else
            res.status(400).json({});
        }
        else
        res.status(400).json({});

      } else {
        res.status(400).json({});
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(400).json({});
  }
});
