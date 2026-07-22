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
//get student by id
const getStudentById = (req, res) => {

    const id = req.params.id;

    studentModel.getStudentById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        return res.status(200).json(results[0]);

    });

};

const updateStudent = (req, res) => {

    const id = req.params.id;

    const {
        name,
        roll_no,
        email,
        semester
    } = req.body;

    const studentData = [
        name,
        roll_no,
        email,
        semester
    ];

    studentModel.updateStudent(id, studentData, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student Updated Successfully"
        });

    });

};

const deleteStudent = (req, res) => {

    const id = req.params.id;

    studentModel.deleteStudent(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });

    });

};

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent

};