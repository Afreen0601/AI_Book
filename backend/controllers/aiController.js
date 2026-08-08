const geminiService = require("../services/geminiService");

const testAI = async (req, res) => {

    try {

        const answer = await geminiService.generateContent(
            "Say Hello from Gemini AI"
        );

        res.status(200).json({
            success: true,
            response: answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
            details: error
        });
    }

};

module.exports = {
    testAI
};