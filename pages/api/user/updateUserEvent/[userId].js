import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function UpdateUserEventAction(req, res) {
  //Check for different statuses to send proper payload
  if (req.query?.userId) {
    const baseUri = process.env.baseUri;
    const url = `${baseUri}user/EventsCards/${req.query?.userId}`;
    
    // Get the user session and access token
    
    const { user, accessToken } = getSession(req);
    console.log("userEveaccessTokenntsRaw",accessToken)
    const userEventsRaw = await fetch(url, {
      method: "GET",
      headers: {
        'authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      }
    });
    const currentUserEvents = await userEventsRaw.json();

    if (currentUserEvents.length > 0) {
        var oldevent = currentUserEvents.find(event => event.id == req.body.data.id);
        currentUserEvents.splice(currentUserEvents.indexOf(oldevent), 1, body.data);
    }

    res.status(200).json(currentUserEvents);
  } 
  else {
    res.status(400).json([]);
  }
});
