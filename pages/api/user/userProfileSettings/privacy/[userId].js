import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req,res);
    const { user } = session;
    const getToken = async () => {
        try {
          const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, 
          {
            method:"post",
            headers: {
                
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(
            {
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`
            })});
            var resp = await response.json();
            console.log("resp",resp)
          return resp.access_token;
        } catch (error) {
          console.error('Error getting token:', error);
        }
      };
    if (user) {
        try {
            const token = await getToken();
            console.log("token",token)
            const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.query?.userId}`, {
                method:"delete",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.status(response.status).json(JSON.stringify(await response.json()));
        } catch (error) {
            console.log("delete user",  error)
            res.status(400).json('Error deleting user:', JSON.stringify( error));
        }

    }
    else {
        res.status(400).json("There was an issue removing data, contact support.");
    }
}); 