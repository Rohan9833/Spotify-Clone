require("dotenv").config();
const DB = require("./src/config/DB")
const app = require("./src/app")
DB();

// app.listen(3000,()=>{
//     console.log("your server is running on port 3000")
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
