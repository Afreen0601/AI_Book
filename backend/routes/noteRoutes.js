const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
    "/admin/notes",
    verifyToken,
    upload.single("file"),
    noteController.uploadNote
);

router.get(
    "/student/notes",
    noteController.getAllNotes
);
// Delete Note
router.delete(
    "/notes/:id",
    verifyToken,
    noteController.deleteNote
);


module.exports = router;