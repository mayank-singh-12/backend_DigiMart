const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGOURI;

async function initializeDatabase() {
  try {
    const dbConnection = await mongoose.connect(mongoUri);
    console.log("Connected to database.");
  } catch (error) {
    console.log("DB CONNECTION ERROR: ", error);
  }
}

module.exports = { initializeDatabase };
