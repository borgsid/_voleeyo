import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import EventModel from "../../Models/eventResponseModel";

export default withApiAuthRequired(async function UserEventsAction(req, res) {
  const session = await getSession(req, res);
  const { user } = session;
  //TODO sorting &sorted[param]=eventYear&sorted[how]=asc
  var querystring=req.query?.userId!="0"?
    `?where=[{"attribute":"userId","operator":"=","value":"${req.query?.userId}"}]`
    :"";
  var myCurrentEventsRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events${querystring}`, {
    method: "get"
  })

  if (!user || myCurrentEventsRaw.status != 200)
    res.status(400).json([]);

  const myCurrentEvents = await myCurrentEventsRaw.json();
  var resp = EventModel(myCurrentEvents);
  res.status(200).json(resp);
});
