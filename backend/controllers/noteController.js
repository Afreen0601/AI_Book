const noteModel = require("../models/noteModel");

// Upload Note
const uploadNote = (req, res) => {

    const { title, subject_id } = req.body;

    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "Please upload a PDF file."
        });
    }

    const noteData = [
        title,
        file.originalname,
        file.path,
        subject_id,
        req.admin.id
    ];

    noteModel.uploadNote(noteData, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "Note Uploaded Successfully"
        });

    });

};


// Get All Notes
const getAllNotes = (req, res) => {

    noteModel.getAllNotes((err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message
            });
        }

        // Add complete URL for each uploaded PDF
        const notes = results.map(note => ({
            ...note,
            file_url: `http://localhost:3000/${note.file_path}`
        }));

        res.status(200).json({
            success: true,
            notes: notes
        });

    });

};
module.exports = {
    uploadNote,
    getAllNotes
};