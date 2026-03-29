const express = require("express");
const authroutes = require("./routes/auth.routes");
const musicroutes = require("./routes/music.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors");

const app = express();


app.use(cookieParser())
app.use(express.json());
app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "https://spotify-clone-jvnb2591r-rohan-pals-projects-8a0d598b.vercel.app",
      "https://rohanmusicplayer.vercel.app"
    ],

    credentials: true,
  })
);


app.use("/api/auth",authroutes);
app.use("/api/music",musicroutes);

// app.use("api/album",musicroutes);
module.exports = app;