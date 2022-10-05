import express from "express";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
