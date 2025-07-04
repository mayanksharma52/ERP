const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const employeeRoute = require("./routes/emplyeeRoute");
const cors = require("cors");

dotenv.config();
const DbConnection = require("./databaseconnection");
DbConnection();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/employee",employeeRoute);
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
