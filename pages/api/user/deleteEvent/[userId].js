import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  // Check for different statuses to send proper payload
  const body = JSON.parse(req.body);
  const session = await getSession(req, res);
  const { user } = session;

  if (!user)
    res.status(400).json([]);
  else {

    var savedEventRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events/${body.cardGuid}`, {
      method: "delete",
    })
    if (savedEventRaw.status != 200)
      res.status(400).json([]);
    else {

      //GET ALL USER EVENTS
      const baseUri = process.env.baseUri;
      const url = `${baseUri}user/EventsCards/${req.query?.userId}`;
      // Get the user session and access token
      const userEventsRaw = await fetch(url, {
        method: "GET",
        headers: {
          'cookie': `${req.headers.cookie}`,
          'content-type': 'text/plain;charset=UTF-8'
        }
      });
      const currentUserEvents = await userEventsRaw.json();
      res.status(200).json(currentUserEvents);
    }
  }
});
