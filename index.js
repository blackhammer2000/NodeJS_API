const express = require("express");
const router = require("./router/routes");
require("dotenv").config();

const databaseStudentSchema = require("./schemas/student");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});
