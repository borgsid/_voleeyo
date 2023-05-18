import { withApiAuthRequired ,getSession} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req,res);
    const {user} =session;
    //Check for different statuses to send proper payload
    const network={ 
        nodes: [
            { id: '1',userName:'You', group: 0 },
            { id: '2',userName:'Alice James', group: 0 },
            { id: '3',userName:'Bob Walber', group: 0 },
            { id: '4',userName:'Charlie West', group: 1 },
            { id: '5',userName:'Dave Brown', group: 2 },
            { id: '6',userName:'Eve O-marley', group: 3 },
          ],
          links: [
            { source: '2', target: '3', value: 3, eventName: 'New York City Marathon', yearOfParticipation: 2016 },
            { source: '2', target: '4', value: 2, eventName: 'Boston Marathon', yearOfParticipation: 2007 },
            { source: '3', target: '4', value: 4, eventName: 'Chicago Marathon', yearOfParticipation: 2000 },
            { source: '4', target: '5', value: 1, eventName: 'London Marathon', yearOfParticipation: 2012 },
            { source: '5', target: '2', value: 1, eventName: 'Tokyo Marathon', yearOfParticipation: 2022 },
            { source: '6', target: '2', value: 1, eventName: 'Tokyo Marathon', yearOfParticipation: 2023 },
            { source: '1', target: '2', value: 1, eventName: 'Charity Walk', yearOfParticipation: 2022 },
            { source: '1', target: '2', value: 1, eventName: 'Food Drive', yearOfParticipation: 2022 },
            { source: '1', target: '4', value: 1, eventName: 'Environmental Cleanup', yearOfParticipation: 2021 },
            { source: '1', target: '6', value: 1, eventName: 'Blood Drive', yearOfParticipation: 2021 },
            { source: '1', target: '3', value: 1, eventName: 'Animal Shelter Volunteer', yearOfParticipation: 2020 },
            { source: '1', target: '3', value: 1, eventName: 'Community Garden', yearOfParticipation: 2020 },
          ]
    };
    
    if (user) 
        res.status(200).json(network);
    else 
        res.status(400).json([]);
  });