const mongoose = require("mongoose");
const database = () => {
    mongoose.connection.on("connected", () => {
        console.log("Connect to database successfully");
    });
    mongoose.connection.on("error", () => {
        console.log("Connect to database error");
    });
};
module.exports = database;