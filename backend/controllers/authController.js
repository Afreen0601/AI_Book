const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");

const adminLogin = (req, res) => {

    const { email, password } = req.body;

    adminModel.findAdminByEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Admin Not Found"
            });
        }

        const admin = results[0];

        bcrypt.compare(password, admin.password, (err, isMatch) => {

            if (err) {
                return res.status(500).json({
                    message: "Error Comparing Password"
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect Password"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Login Successful"
            });

        });

    });

};

module.exports = {
    adminLogin,
};