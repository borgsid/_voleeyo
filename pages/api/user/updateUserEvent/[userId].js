import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import EventModel from "../../Models/eventResponseModel";

export default withApiAuthRequired(async function UpdateUserEventAction(req, res) {
  //Check for different statuses to send proper payload
  if (req.query?.userId) {
    const model = JSON.parse(req.body).data;
    var updateEventRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events/${model.uid}`, {
      method: "post",
      body: JSON.stringify(
        {
          userId:req.query?.userId,
          eventYear: model.eventYear,
          eventLocation: model.eventLocation,
          eventName: model.eventName,
          eventRole: model.eventRole
        })
      ,
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    })

    if (updateEventRaw.status != 200)
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
  } else {
    res.status(400).json([]);
  }
});
