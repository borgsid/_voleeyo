import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const { name } = JSON.parse(req.body);
  const { surname } = JSON.parse(req.body);
  const { bio } = JSON.parse(req.body);
  const { v_uid } = JSON.parse(req.body);
  const { userId } = JSON.parse(req.body);
  const { isActive } = JSON.parse(req.body);
  const session = await getSession(req, res);
  const { user } = session;
  if (!user)
    res.status(400).json({});
  else {
    var savedProfileRaw = await fetch(`${process.env.DESKREE_BASE_URL}/volunteers/${v_uid}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        bio,
        userId,
        isActive
      }),
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    })
    if (savedProfileRaw.status != 200)
      res.status(400).json({});
    else {
      const savedProfile = await savedProfileRaw.json();
      res.status(200).json(savedProfile.data);
    }
  }
});
