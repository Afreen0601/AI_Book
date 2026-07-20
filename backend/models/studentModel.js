const db = require("../config/db");

// Add Student
const addStudent = (studentData, callback) => {

    const query = `
        INSERT INTO students
        (name, roll_no, email, password, semester)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, studentData, callback);
};

// Get All Students
const getAllStudents = (callback) => {

    const query = `
        SELECT id, name, roll_no, email, semester
        FROM students
    `;

    db.query(query, callback);
};

module.exports = {
    addStudent,
    getAllStudents
};