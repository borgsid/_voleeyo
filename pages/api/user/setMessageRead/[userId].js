import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (req.query.userId) {
        //todo update message status
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
  });