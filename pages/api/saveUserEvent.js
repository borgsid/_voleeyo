const SaveUserEventAction = async (req, res) => {
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
            body.data.id=20;
            currentUserEvents.push(body.data);
        }
        res.status(200).json(currentUserEvents);
      }
      else {
        res.status(400).json([]);
      }
  };
  export default SaveUserEventAction;