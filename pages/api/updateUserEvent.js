const UpdateUserEventAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode) {
        const baseUri= process.env.baseUri;
        const userEventsRaw = await fetch(`${baseUri}userCards`,
        { method: "POST",
            body: JSON.stringify({ secretCode:body.secretCode })
        });

        const currentUserEvents = await userEventsRaw.json();
        if(currentUserEvents.length>0){
            var oldevent =currentUserEvents.find(event=> event.id== body.data.id)
            currentUserEvents.splice(currentUserEvents.indexOf(oldevent),1,body.data);
            body.data.eventYear=9999;
        }
        res.status(200).json(currentUserEvents);
      }
      else {
        res.status(400).json([]);
      }
  };
  export default UpdateUserEventAction;