import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },
    mentorHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: false,
    }],
  },
  {
    collection: "Student",
    versionKey: false,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
