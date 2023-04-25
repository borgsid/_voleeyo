const UserCardsAction = async (req, res) => {
    const input = JSON.parse(req.body).secretCode;
    // Check for different statuses to send proper payload
    if (process.env.log_in_key==input) {
      res.status(200).json([
                    {
                        eventName: "Charity Walk",
                        eventYear: 2022,
                        eventLocation: "New York",
                        eventRole: "Volunteer"
                    },
                    {
                        eventName: "Food Drive",
                        eventYear: 2022,
                        eventLocation: "Chicago",
                        eventRole: "Donor"
                    },
                    {
                        eventName: "Environmental Cleanup",
                        eventYear: 2021,
                        eventLocation: "San Francisco",
                        eventRole: "Volunteer"
                    },
                    {
                        eventName: "Blood Drive",
                        eventYear: 2021,
                        eventLocation: "Los Angeles",
                        eventRole: "Donor"
                    },
                    {
                        eventName: "Animal Shelter Volunteer",
                        eventYear: 2020,
                        eventLocation: "Seattle",
                        eventRole: "Volunteer"
                    },
                    {
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