const express = require("express");
const router = require("./router/routes");
const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./schemas/student");

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DATABASE_URI;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});

mongoose.connect(DB_URI, () => {
  console.log("connected to the database...");
});

// mongoose.connect(DB_URI, () => {
//   mongoose.connection.on("connection", (err) => {
//     if (err) console.log("error encountered..");
//     console.log("connected to the database...");
//   });
// });
