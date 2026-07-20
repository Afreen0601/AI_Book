const studentModel = require("../models/studentModel");
const bcrypt = require("bcrypt");

// Add Student
const addStudent = (req, res) => {

    const {
        name,
        roll_no,
        email,
        password,
        semester
    } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {

        if (err) {
            return res.status(500).json({
                message: "Error hashing password"
            });
        }

        const studentData = [
            name,
            roll_no,
            email,
            hashedPassword,
            semester
        ];

        studentModel.addStudent(studentData, (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message
                });
            }

            return res.status(201).json({
                success: true,
                message: "Student Added Successfully"
            });

        });

    });

};

// Get All Students
const getAllStudents = (req, res) => {

    studentModel.getAllStudents((err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json(results);

    });

};

module.exports = {
    addStudent,
    getAllStudents
};