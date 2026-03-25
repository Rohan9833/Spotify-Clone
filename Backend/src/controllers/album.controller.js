const jwt = require("jsonwebtoken");
const { bulkupload } = require("../service/storage.service");
const albummodel = require("../model/album.model")


async function album(req, res) {
  const token = req.cookies.token;
  const title = req.body.title;

  if (!token) {
    return res.status(400).json({
      message: "missiong token",
    });
  }

  let verifiedtoken;
  try {
    const check = jwt.verify(token, process.env.jsonwebtoken);
    verifiedtoken = check;
  } catch {
    return res.status(400).json({ message: "invalid token" });
  }
  const artist = verifiedtoken.id;

 


  const result = await bulkupload(req.files);

  const album = await albummodel.create({
    title,
    artist,
    music: result
  })


  return res.status(200).json({ message: "succesfull", result: result });
}

module.exports = { album };
