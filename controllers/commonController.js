import Student from "../models/studentModel.js";
import Mentor from "../models/mentorModel.js";

const assignStudentToMentor = async (req, res, next) => {
  try {
    const { studentId, mentorId } = req.params;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );
    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $addToSet: { students: studentId } },
      { new: true }
    );

    res.json({ student, mentor });
  } catch (error) {
    next(error);
  }
};

const assignOrChangeMentorForStudent = async (req, res, next) => {
  try {
    const { studentId, newMentorId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // If the student already has a mentor, move the current mentor to the history array
    if (student.mentor) {
      student.mentorHistory.push(student.mentor);
    }

    // Update the student's mentor to the new one
    student.mentor = newMentorId;
    await student.save();

    const newMentor = await Mentor.findByIdAndUpdate(
      newMentorId,
      { $addToSet: { students: studentId } },
      { new: true }
    );

    res.json({
      message: "Mentor assigned or changed successfully",
      student,
      newMentor,
    });
  } catch (error) {
    next(error);
  }
};


const getMentorStudents = async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId).populate("students");
    res.json(mentor.students);
  } catch (error) {
    next(error);
  }
};

const getPreviousMentor = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("mentor").populate("mentorHistory");

    // Get the prev mentor from DB
    const previousMentor = student.mentorHistory[student.mentorHistory.length - 1];

    res.json(previousMentor);
  } catch (error) {
    next(error);
  }
};


export default {
  assignStudentToMentor,
  assignOrChangeMentorForStudent,
  getMentorStudents,
  getPreviousMentor,
};
