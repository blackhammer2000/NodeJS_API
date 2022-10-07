const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender must be provided"],
  },
  admission_number: {
    type: Number,
    required: [true, "Admission number is required"],
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
