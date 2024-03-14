const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log(` database/db.js | ${process.env.MONGODB}`);
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDB database connection established successfully!");
  } catch (error) {
    console.error("Database initialization error:", error.message);
    throw new Error("Database initialization error");
  }
};

/*
* username: test
* mail: test@gmail.com
* pass: SecureP@ss123
*/
module.exports = dbConnection;
