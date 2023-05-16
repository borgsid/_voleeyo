const UserPrivacyAction = async (req, res) => {
    const body=JSON.parse(req.body);
    //Check for different statuses to send proper payload
    if (process.env.log_in_key==body.secretCode) {
        //todo update message status
        res.status(200).json("Your data has been removed.");
    }
    else {
        res.status(400).json("There was an issue removing data, contact support.");
    }
  };
  export default UserPrivacyAction;