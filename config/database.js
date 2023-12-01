// config/database.js
// import mongoose library
const mongoose = require("mongoose");

// storing connection string in a variable - for testing
const connectionString = process.env.DATABASE_URL;

//  establish connection to database
mongoose.connect(connectionString);

// reference the current connection
const db = mongoose.connection;

// event listener to provide feedback on connection status
db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// connection event listener
db.on("error", function (error) {
  console.log(`something went WRONG with the connection`);
});
