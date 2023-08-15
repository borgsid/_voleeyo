import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
    const eventModel = JSON.parse(req.body).data;
    
    //Check for different statuses to send proper payload
    if (req.query?.userId) {
        eventModel.userId= req.query?.userId;
        //save event then link to user
        var savedEventRaw = await fetch(`${process.env.DESKREE_BASE_URL}/events`, {
            method: "post",
            body:JSON.stringify( eventModel)
            ,
            headers:{
                "content-type":"application/json; charset=utf-8"
            }
        })

        if (savedEventRaw.status != 200)
            res.status(400).json([]);
        else {
            //GET ALL USER EVENTS
            const baseUri = process.env.baseUri;
            const url = `${baseUri}user/EventsCards/${req.query?.userId}`;
            // Get the user session and access token
            const userEventsRaw = await fetch(url, {
                method: "GET",
                headers: {
                    'cookie': `${req.headers.cookie}`,
                    'content-type': 'text/plain;charset=UTF-8'
                }
            });
            const currentUserEvents = await userEventsRaw.json();
            res.status(200).json(currentUserEvents);
        }
    }
    else {
        res.status(400).json([]);
    }
});