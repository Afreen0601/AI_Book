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

module.exports = router;