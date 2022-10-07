const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: string,
    required: true,
  },
  lastname: {
    type: string,
    required: true,
  },
  gender: {
    type: string,
    required: true,
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
