const SetMeassageReadAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode && body?.message.id>0) {
        //todo update message status
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
  };
  export default SetMeassageReadAction;