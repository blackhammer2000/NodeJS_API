const express = require("express");
const router = require("./router/routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DATABASE_URI;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});

const connection = mongoose.connect(DB_URI);

connection.on("connected", () => {
  console.log("connected to the database...");
});

connection.on("disconnected", () => {
  console.log("disconnected to the database...");
});
