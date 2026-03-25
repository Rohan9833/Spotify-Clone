const { mongoose } = require("mongoose");
require("dotenv").config();


async function DBconnect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("database connected");
  } catch {
    console.error("Database Connection error", error);
  }
}

module.exports = DBconnect
