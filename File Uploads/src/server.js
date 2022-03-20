const app = require("./index");

// importing the db.js file
const connect = require("./configs/db");

app.listen(3200, async () => {
  try {
    await connect();
    console.log("listening on port 3200");
  } catch (err) {
    console.error(err.message);
  }
});
