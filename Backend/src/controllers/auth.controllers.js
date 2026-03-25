const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function registeruser(req, res) {
  const { username, email, role, password } = req.body;

  let userexists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userexists) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.jsonwebtoken,
  );

  (res.cookie("token", token, {
    httpOnly: true,
    secure: false, // localhost pe false
    sameSite: "lax",
  }),
    res.status(200).json({
      message: "user created",
    }));
}

async function loginuser(req, res) {
  console.log("LOGIN API HIT");

  const { username, email, password } = req.body;

  const userexist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!userexist) {
    return res.status(888).json({
      message: "user not found",
    });
  }

  const passwordmatch = await bcrypt.compare(password, userexist.password);

  if (!passwordmatch) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: userexist._id,
      role: userexist.role,
    },
    process.env.jsonwebtoken,
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "you logged in successfully",
  });
}

module.exports = { registeruser, loginuser };
