import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async (req, res) => {
    const session = await getSession(req, res);
    const { user } = session;
    if (user) {
        const flags = []
        //Get all events
        var body= JSON.parse( req.body)
        var linkVol = `${process.env.DESKREE_BASE_URL}/flags`;
        var flagsRaw = await fetch(linkVol, {
            method: "Post",
            "content-type": "application/json",
            body: JSON.stringify(
                {
                    "flagLabel": body.label,
                    "flagId": body.uid,
                    "value": body.isActive
                }
            )
        });
        if (flagsRaw.status == 200) {
            flags = (await flagsRaw.json()).data.map(x => {
                label = x.attributes.label,
                    uid = x.uid
            })
            res.status(200).json(flags);
        }

    } else
        res.status(400).json([]);
});