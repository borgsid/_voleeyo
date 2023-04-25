const CheckSecretAction = async (req, res) => {
    console.log('Received request',res);
    const input = JSON.parse(req.body).secretCode;
    // Check for different statuses to send proper payload
    if (process.env.log_in_key==input) {
      res.status(200).json({response:"access granted",status: true, name:"John", surname:"Doe",email:"johndoe@example.com"});
    }
    else {
      res.status(400).json({ error: "access denied",status: false });
    }
  };
  export default CheckSecretAction;