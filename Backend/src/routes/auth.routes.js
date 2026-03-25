const express = require('express');
// const authcontrollers = require("../controllers/auth.controllers");
const authcontrollers = require("../controllers/auth.controllers");


const router = express.Router();

router.post("/register",authcontrollers.registeruser);

router.post("/login",authcontrollers.loginuser);

// router.post("/login",(req,res)=>{
//     res.send("LOGIN ROUTE WORKING");
// });

module.exports = router;