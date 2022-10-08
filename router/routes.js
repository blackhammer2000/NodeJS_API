const express = require("express");
const Student = require("../schemas/student");
const router = express.Router();

router.get("/students", async (_req, res) => {
  Student.find((error, data) => {
    if (!error) {
      res.json({
        students: data,
      });
    } else {
      res.json({
        err: error.message,
      });
    }
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

router.patch("/students/:id", (req, res) => {
  const { id } = req.params;

  Student.findByIdAndUpdate(id, { firstname: "Samuel" });
  res.json({ message: "Data successfully modified..." });
});

module.exports = router;
