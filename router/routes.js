const express = require("express");
const router = express.Router();

router.get("/students", (_req, res) => {
  res.json({
    message: "hi",
  });
});

router.post("/students", (req, res) => {
  console.log(req);
  const newStudent = req.body;
  res.json(newStudent);
});

module.exports = router;
