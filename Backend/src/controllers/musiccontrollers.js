const musicmodle = require("../model/music.model");
const jwt = require("jsonwebtoken");
const { imagekitupload } = require("../service/storage.service");
// const upload = require("../../uploads/1773807924968-music.mp3");

const fs = require("fs");

async function createmusic(req, res) {
  const file = req.file;
  const title = req.body.title;
  // console.log(req);
  let tokenverified;
  const token = req.cookies.token;

  if (!token) {
    return res.status(989).json({
      message: "missing token",
    });
  }

  try {
    const tokenverify = await jwt.verify(token, process.env.jsonwebtoken);
    tokenverified = tokenverify;
  } catch {
    return res.status(400).json({
      message: "forged token",
    });
  }

  if (tokenverified.role != "Artist") {
    return res.status(404).json({
      message: "forbidden error u are not artist",
    });
  }

  const result = await imagekitupload(file);
  const url = result.url;
  console.log(url);

  const music = await musicmodle.create({
    title,
    url,
    artist: tokenverified.id,
  });

  return res.status(200).json({
    message: `music uploaded sucessfully`,
    // result: result,
  });
}

module.exports = { createmusic };
