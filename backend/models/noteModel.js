const db = require("../config/db");

const uploadNote = (noteData, callback) => {

    const sql = `
        INSERT INTO notes
        (title, file_name, file_path, subject_id, uploaded_by)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, noteData, callback);
};

const getAllNotes = (callback) => {

    const sql = `
        SELECT
            notes.id,
            notes.title,
            notes.file_name,
            notes.file_path,
            subjects.subject_name,
            subjects.semester
        FROM notes
        JOIN subjects
        ON notes.subject_id = subjects.id
    `;

    db.query(sql, callback);
};

module.exports = {
    uploadNote,
    getAllNotes
};