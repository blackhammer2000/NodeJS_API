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
    required: true,
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
