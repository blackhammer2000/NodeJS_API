const express = require("express");
const router = express.Router();

const { ObjectId } = require("mongodb");
const { studentBodyValidator, userBodyValidator } = require("../auth/authData");
const { signAccessToken } = require("../auth/tokens");
const Student = require("../schemas/student");
const User = require("../schemas/user");

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
  try {
    const newStudent = req.body;
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

router.post("/user/register", async (req, res, next) => {
  try {
    const isValid = await userBodyValidator.validateAsync(req.body);
    if (!isValid) throw new Error(`Valid data format...`);

    const { email } = req.body;

    const emailExists = await User.findOne({ email: email });

    if (emailExists)
      throw new Error(`User with the given email already exists...`);

    const user = new User(req.body);

    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);

    res.status(200).json({ token: accessToken });
  } catch (err) {
    next(err);
  }
});

///////////////////////PATCH ROUTES//////////////////////////////

router.patch("/students", async (req, res) => {
  try {
    const { id, data } = req.body;

    if (!ObjectId.isValid(id)) throw new Error("Not a valid document ID.");

    const update = await Student.updateOne(
      { _id: ObjectId(id) },
      { $set: data }
    );

    if (!update) {
      throw new Error("Could not update the selected document.");
    }

    res.json({ message: "Data successfully modified in the database..." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/students", async (req, res) => {
  try {
    const { id } = req.body;

    if (!ObjectId.isValid(id)) throw new Error("Not a valid document ID.");

    const deletion = await Student.deleteOne({ _id: ObjectId(id) });

    if (!deletion) {
      throw new Error("Could not delete the selected document.");
    }

    res.json({ message: "Data successfully deleted from the database..." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
