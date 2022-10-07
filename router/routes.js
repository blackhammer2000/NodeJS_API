const express = require("express");
const Student = require("../schemas/student");
const router = express.Router();

router.get("/students", (_req, res) => {
  res.json({
    message: "hi",
  });
});

router.post("/students", async (req, res) => {
  // console.log(req.body);
  const newStudent = req.body;

  try {
    const newStudentEntry = Student.create(newStudent);

    if (!newStudentEntry) {
      throw new Error("Data save process failed...");
    }

    res.json({ message: "Data saved successfully...", body: newStudent });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

module.exports = router;
