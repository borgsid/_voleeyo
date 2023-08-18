import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import CheckEventsSimilarity from "../Components/eventsRegexChecker.js"
export default withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const { user } = session;
  if (user) {
    //Check for different statuses to send proper payload
    const network = {
      nodes: [],
      links: []
    };
    const nodeList=[];
    //Get all events
    const baseUri = process.env.baseUri;
    const url = `${baseUri}user/EventsCards/0`;
    // Get the user session and access token
    const userEventsRaw = await fetch(url, {
      method: "GET",
      headers: {
        'cookie': `${req.headers.cookie}`,
        'content-type': 'text/plain;charset=UTF-8'
      }
    });
    if (userEventsRaw.status == 200) {
      var userEvents = await userEventsRaw.json();
      var userIds = [... new Set(userEvents.map(x => x.userId))];
      //get user detail
      await Promise.all(
      userIds.map(async (x, i) => {
        var queryStringVolunteers = [{ attribute: "userId", operator: "=", value: x }];
        var linkVol = `${process.env.DESKREE_BASE_URL}/volunteers?where=${JSON.stringify(queryStringVolunteers)}`;
        const userDetailRaw = await fetch(linkVol);
        if (userDetailRaw.status == 200) {
          var userDetail = await userDetailRaw.json();
          if (userDetail.meta?.total > 0) {
            var userDetailList=userDetail.data[0];
            //map user events
            network.nodes.push( {
              id: userDetailList.attributes.userId.replace(/[^a-zA-Z0-9]/g, ''),
              userName: userDetailList.attributes.userId==req.query?.userId
              ?'You'
              :`${userDetailList.attributes.name} ${userDetailList.attributes.surname}`,
              group: 0
            })
          }
        }
      }));
     
      //check every event name replace with the first
      var eventArrylength = userEvents.length - 1;
      for (var i = 0; i < eventArrylength; i++) {
        var text1 = userEvents[i].eventName;
        var text2 = userEvents[i + 1].eventName;
        //filter events with same name
        if (CheckEventsSimilarity(text1, text2)) {
          //create a relation ship between the users and the event
          network.links.push(
            {
              source: userEvents[i].userId.replace(/[^a-zA-Z0-9]/g, ''),
              target: userEvents[i + 1].userId.replace(/[^a-zA-Z0-9]/g, ''),
              value: 2,
              eventName: userEvents[i].eventName,
              yearOfParticipation: userEvents[i].eventYear
            }
          )
        }
      }
      res.status(200).json(network);
    }
    else
      res.status(400).json([]);
  } else
    res.status(400).json([]);
});