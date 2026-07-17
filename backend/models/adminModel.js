const db = require("../config/db");

const findAdminByEmail = (email, callback) => {
    const query = "SELECT * FROM admins WHERE email = ?";
    db.query(query, [email], callback);
};

module.exports = {
    findAdminByEmail
};