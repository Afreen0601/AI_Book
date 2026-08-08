const pdfService = require("../services/pdfService");
const geminiService = require("../services/geminiService");

const testPDFSummary = async (req, res) => {

    try {

        // 1. Read PDF
        const filePath = "uploads/1784916968984.pdf";

        const text = await pdfService.extractTextFromPDF(filePath);

        // 2. Create AI prompt
        const prompt = `
You are an AI assistant for a college notes management system.

Read the following college notes and create a clear, concise summary.

Requirements:
- Identify the main topics.
- Explain the important concepts.
- Use headings and bullet points.
- Do not add information that is not present in the notes.
- Make the summary useful for a college student preparing for exams.

Notes:

${text}
`;

        // 3. Send text to Gemini
        const summary = await geminiService.generateContent(prompt);

        // 4. Return summary
        res.status(200).json({
            success: true,
            message: "AI summary generated successfully",
            summary: summary
        });

    } catch (error) {

        console.error("PDF Summary Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate AI summary",
            error: error.message
        });
    }
};

module.exports = {
    testPDFSummary
};