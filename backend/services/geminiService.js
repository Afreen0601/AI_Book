const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateContent = async (prompt) => {
    try {

        const interaction = await ai.interactions.create({
            model: "gemini-3-flash-preview",
            input: prompt
        });

        return interaction.output_text;

    } catch (error) {

        console.error(
            "Gemini Error:",
            error.message
        );

        throw error;
    }
};

module.exports = {
    generateContent
};