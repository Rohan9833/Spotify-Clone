require("dotenv").config();
const DB = require("./src/config/DB")
const app = require("./src/app")
DB();

app.listen(3000,()=>{
    console.log("your server is running on port 3000")
})

