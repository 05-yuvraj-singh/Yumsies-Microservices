const app = require("./app.js");
const connectDB = require("./config/database.js");
const port = process.env.PORT;

//connection
connectDB();

app.listen(port, () => {
  console.log(`APP RUNNING ON PORT ${port} perfectly`);
});
