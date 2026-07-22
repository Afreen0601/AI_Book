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

const getStudentById = (id, callback) => {

    const query = `
        SELECT id, name, roll_no, email, semester
        FROM students
        WHERE id = ?
    `;

    db.query(query, [id], callback);
};

const updateStudent = (id, studentData, callback) => {

    const query = `
        UPDATE students
        SET
            name = ?,
            roll_no = ?,
            email = ?,
            semester = ?
        WHERE id = ?
    `;

    db.query(query, [...studentData, id], callback);
};

const deleteStudent = (id, callback) => {

    const query = `
        DELETE FROM students
        WHERE id = ?
    `;

    db.query(query, [id], callback);
};

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent

};