const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/auth");

// Add Student
router.post(
    "/students",
    verifyToken,
    studentController.addStudent
);

// Get All Students
router.get(
    "/students",
    verifyToken,
    studentController.getAllStudents
);

router.get(
    "/students/:id",
    verifyToken,
    studentController.getStudentById
);

router.put(
    "/students/:id",
    verifyToken,
    studentController.updateStudent
);

router.delete(
    "/students/:id",
    verifyToken,
    studentController.deleteStudent
);

module.exports = router;