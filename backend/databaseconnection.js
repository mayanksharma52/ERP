const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("✅ Connected to database successfully");
    })
    .catch((error) => {
      console.error("❌ Error connecting to database:", error);
    });
}

module.exports = DbConnection;
