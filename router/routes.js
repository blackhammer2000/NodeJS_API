const express = require("express");
const { ObjectId } = require("mongodb");
const Student = require("../schemas/student");
const router = express.Router();

router.get("/students", async (_req, res) => {
  try {
    const studentsData = await Student.find();

    if (!studentsData) throw new Error("No data was found in the database");

    res.json(studentsData);
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.post("/students", async (req, res) => {
  const newStudent = req.body;

  try {
    const newStudentEntry = await Student.create(newStudent);

    if (!newStudentEntry) {
      throw new Error("Data save process failed...");
    }
    res.status(201).json({
      message: `The data for ${newStudent.name} has been saved to the database successfully...`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.patch("/students", async (req, res) => {
  try {
    const { id } = req.body;

    if (ObjectId.isValid(id)) {
      const update = await Student.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body.data }
      );

      if (!update) {
        throw new Error("Could not update the selected document.");
      }

      res.json({ message: "Data successfully modified in the database..." });
    } else {
      throw new Error("Not a valid document ID.");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/students", async (req, res) => {
  try {
    const { id } = req.body;

    if (ObjectId.isValid(id)) {
      const deletion = await Student.deleteOne({ _id: ObjectId(id) });

      if (!deletion) {
        throw new Error("Could not delete the selected document.");
      }

      res.json({ message: "Data successfully deleted from the database..." });
    } else {
      res.status(404).json({ error: "Not a valid document ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
