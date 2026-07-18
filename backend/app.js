const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to AI Book Backend 🚀");
});

module.exports = app;