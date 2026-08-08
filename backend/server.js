require("dotenv").config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const app = require("./app");

// Import database connection
require("./config/db");

const verifyToken = require("./middleware/auth");

app.get("/admin/dashboard", verifyToken, (req, res) => {
    res.json({
        message: "Welcome Admin!",
        admin: req.admin
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});