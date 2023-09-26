import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import CheckEventsSimilarity from "../Components/eventsRegexChecker.js"
export default withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const { user } = session;
  if (user) {
    //Check for different statuses to send proper payload
    const network = {
      nodes: [],
      links: [],
      uniqueEvents:[]
    };
    const nodeList = [];
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
              var userDetailList = userDetail.data[0];
              //map user events
              network.nodes.push({
                id: userDetailList.attributes.userId.replace(/[^a-zA-Z0-9]/g, ''),
                userName: userDetailList.attributes.userId == req.query?.userId
                  ? 'You'
                  : `${userDetailList.attributes.name} ${userDetailList.attributes.surname}`,
                group: 0
              })
            }
          }
        }));

      const groupedEvents = {};

      userEvents.forEach(event => {
        const eventName = event.eventName;
        if (!groupedEvents[eventName]) {
          groupedEvents[eventName] = [];
        }
        groupedEvents[eventName].push(event);
      });

      for (const eventName in groupedEvents) {
        if (groupedEvents.hasOwnProperty(eventName)) {
          const events = groupedEvents[eventName];

          var eventArrylength = events.length - 1;
          if (events.length > 1)
            for (var i = 0; i < eventArrylength; i++)
              network.links.push(
                {
                  source: events[i].userId.replace(/[^a-zA-Z0-9]/g, ''),
                  target: events[i + 1].userId.replace(/[^a-zA-Z0-9]/g, ''),
                  value: 2,
                  eventName: events[i].eventName,
                  yearOfParticipation: events[i].eventYear
                }
              );
          else
            network.uniqueEvents.push(
              {
                source: events[0].userId.replace(/[^a-zA-Z0-9]/g, ''),  
                eventName: events[0].eventName,
                yearOfParticipation: events[0].eventYear
              }
            );
        }
      }
      res.status(200).json(network);
    }
    else
      res.status(400).json([]);
  } else
    res.status(400).json([]);
});