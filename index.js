import express from "express";
import { config } from "dotenv";
import { router } from "./routes/api";
// import { rootDirectoryGet } from "./routes/api.js";
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening for requests on PORT ${PORT}`);
});

app.use("/", router);
