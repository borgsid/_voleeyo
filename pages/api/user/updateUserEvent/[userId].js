import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import EventModel from "../../Models/eventResponseModel";

export default withApiAuthRequired(async function UpdateUserEventAction(req, res) {
  //Check for different statuses to send proper payload
  if (req.query?.userId) {
    const body = JSON.parse(req.body);
    const baseUri = process.env.baseUri;

    // const url = `${baseUri}user/EventsCards/${req.query?.userId}`;
    // Get the user session and access token
    // const userEventsRaw = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //         'cookie': `${req.headers.cookie}`,
    //         'content-type': 'text/plain;charset=UTF-8'
    //     }
    // });
    // const currentUserEvents = await userEventsRaw.json();

    var myCurrentEventsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events`, {
      method: "get"
    })
    var currentUserEvents =await myCurrentEventsRaw.json();
    var resp = EventModel(currentUserEvents);
  

//TODO

    if (currentUserEvents.length > 0) {
      var oldevent = currentUserEvents.find(event => event.id == body.data.id);
      currentUserEvents.splice(currentUserEvents.indexOf(oldevent), 1, body.data);
    }

    res.status(200).json(currentUserEvents);
  } else {
    res.status(400).json([]);
  }
});
