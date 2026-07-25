const express = require("express");
const path = require("path");



const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", studentRoutes);
app.use("/api", noteRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to AI Book Backend 🚀");
});

module.exports = app;