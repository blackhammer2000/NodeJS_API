const express = require("express");
const router = express.Router();

router.get("/students", (_req, res) => {
  res.json({
    message: "hi",
  });
});

module.exports = router;
