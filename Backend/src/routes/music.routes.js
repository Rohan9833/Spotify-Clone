const express = require("express");
const musiccontroller = require("../controllers/musiccontrollers");
const albumcontroller = require("../controllers/album.controller");
const getallmusiccontroller = require("../controllers/getallmusic.controller")
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/musics",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

const router = express.Router();

router.post("/upload", upload.single("music"), musiccontroller.createmusic);
router.post("/album",upload.array("musics",5),albumcontroller.album);
router.get("/getallmusic",getallmusiccontroller.Getallmusic);

module.exports = router;
