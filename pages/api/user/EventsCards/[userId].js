import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import EventModel from "../../Models/eventResponseModel";
import { json } from "d3";

export default withApiAuthRequired(async function UserEventsAction(req, res) {
  // Check for different statuses to send proper payload
  const session = await getSession(req, res);
  const { user } = session;
  var myCurrentEventsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events`, {
    method: "get"
  })

  if (!user || myCurrentEventsRaw.status != 200)
    res.status(400).json([]);

  const myCurrentEvents = await myCurrentEventsRaw.json();
  var resp = EventModel(myCurrentEvents);
  res.status(200).json(resp);
});
