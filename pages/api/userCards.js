const UserCardsAction = async (req, res) => {
    const input = JSON.parse(req.body).secretCode;
    // Check for different statuses to send proper payload
    if (process.env.log_in_key==input) {
      res.status(200).json([
                    {
                        id:1,
                        eventName: "Charity Walk",
                        eventYear: 2022,
                        eventLocation: "New York",
                        eventRole: "Volunteer"
                    },
                    {
                        id:2,
                        eventName: "Food Drive",
                        eventYear: 2022,
                        eventLocation: "Chicago",
                        eventRole: "Donor"
                    },
                    {   id:13,
                        eventName: "Environmental Cleanup",
                        eventYear: 2021,
                        eventLocation: "San Francisco",
                        eventRole: "Volunteer"
                    },
                    {
                        id:14,
                        eventName: "Blood Drive",
                        eventYear: 2021,
                        eventLocation: "Los Angeles",
                        eventRole: "Donor"
                    },
                    {
                        id:16,
                        eventName: "Animal Shelter Volunteer",
                        eventYear: 2020,
                        eventLocation: "Seattle",
                        eventRole: "Volunteer"
                    },
                    {
                        id:19,
                        eventName: "Community Garden",
                        eventYear: 2020,
                        eventLocation: "Denver",
                        eventRole: "Volunteer"
                    }
      ]);
    }
    else {
      res.status(400).json([]);
    }
  };
  export default UserCardsAction;