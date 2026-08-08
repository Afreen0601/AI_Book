const express = require("express");
const path = require("path");
const pdfRoutes = require("./routes/pdfRoutes");



const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", studentRoutes);
app.use("/api", noteRoutes);
app.use("/api/admin", noteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", pdfRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to AI Book Backend 🚀");
});

module.exports = app;