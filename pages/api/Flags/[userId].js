import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const { user } = session;
  if (user) {
    var flags = []
    //Get all events

    var linkVol = `${process.env.DESKREE_BASE_URL}/flags`;
    var flagsRaw = await fetch(linkVol);
    if (flagsRaw.status == 200) {
      var resp= await flagsRaw.json();
      resp.data.forEach((x) => flags.push( {
        label :x.attributes.label,
          uid : x.uid
      }))
      res.status(200).json(flags);
    }

  } else
    res.status(400).json([]);
});