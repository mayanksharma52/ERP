const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
dotenv.config();
const DbConnection = require("./databaseConnection");
DbConnection();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
