require("dotenv").config();

const app = require("./app");

// Import database connection
require("./config/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});