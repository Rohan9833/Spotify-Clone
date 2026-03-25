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
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth",authroutes);
app.use("/api/music",musicroutes);
// app.use("api/album",musicroutes);
module.exports = app;