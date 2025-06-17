const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Error connecting to database", error);
});
db.once("open", function () {
  console.log("Connected to database successfully");
});
module.exports = DbConnection;
