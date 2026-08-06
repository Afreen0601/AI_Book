const noteModel = require("../models/noteModel");
const fs = require("fs");
const path = require("path");

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
const deleteNote = (req, res) => {

    const id = req.params.id;

    noteModel.getNoteById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }

        const note = results[0];

        const filePath = path.join(__dirname, "..", note.file_path);

        fs.unlink(filePath, (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Error deleting PDF file"
                });
            }
        
            noteModel.deleteNote(id, (err, result) => {
        
                if (err) {
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }
        
                return res.status(200).json({
                    success: true,
                    message: "Note Deleted Successfully"
                });
        
            });
        
        });


    });

};
module.exports = {
    uploadNote,
    getAllNotes,
    deleteNote
};