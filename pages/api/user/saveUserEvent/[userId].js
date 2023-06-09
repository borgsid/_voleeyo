import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (req.query?.userId) {
        const baseUri= process.env.baseUri;
        const userEventsRaw = await fetch(`${baseUri}user/EventsCards/${req.query?.userId}`,
        { 
            method: "Get",
            headers: {
                'cookie': `${req.headers.cookie}`,
                'content-type': 'text/plain;charset=UTF-8'
            }
        });

        const currentUserEvents = await userEventsRaw.json();
        if(currentUserEvents.length>0){
            body.data.id=20;
            currentUserEvents.push(body.data);
        }
        res.status(200).json(currentUserEvents);
      }
      else {
        res.status(400).json([]);
      }
  });