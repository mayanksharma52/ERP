const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const hrRoute = require("./routes/hrRoute");
const employeeRoute = require("./routes/emplyeeRoute");
const cors = require("cors");

dotenv.config();
const DbConnection = require("./databaseconnection");
DbConnection();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/employee",employeeRoute);

app.use("/api/hr",hrRoute);
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
