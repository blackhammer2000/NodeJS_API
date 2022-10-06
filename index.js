const express = require("express");
const router = require("./routes/api");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/students");

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});
