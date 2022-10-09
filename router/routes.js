const express = require("express");
const { ObjectId } = require("mongodb");
const { db } = require("../schemas/student");
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
    const newStudentEntry = await Student.create(newStudent);

    if (!newStudentEntry) {
      throw new Error("Data save process failed...");
    }
    res.json({ message: "Data saved successfully...", body: newStudent });
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
      const update = await db
        .collection("students")
        .updateOne({ _id: ObjectId(id) }, { $set: req.body.data });

      if (!update) {
        throw new Error("Could not update the selected document.");
      }

      res.json({ message: "Data successfully modified in the database..." });
    } else {
      res.status(404).json({ error: "Not a valid document ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/students", async (req, res) => {
  try {
    const { id } = req.body;

    if (ObjectId.isValid(id)) {
      const deletion = await db
        .collection("students")
        .deleteOne({ _id: ObjectId(id) });

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
