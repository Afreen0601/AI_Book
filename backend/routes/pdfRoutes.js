const express = require("express");
const router = express.Router();

const {
    testPDFSummary
} = require("../controllers/pdfController");

router.get("/test-pdf-summary", testPDFSummary);

module.exports = router;