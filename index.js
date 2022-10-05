import express from "express";
import { config } from "dotenv";
import { rootDirectoryGet } from "./routes/api.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});

app.get("/", rootDirectoryGet);
