const mongoose = require("mongoose");

require('dotenv').config();

const MongooseURL = process.env.DB_URL;

const initial = async () => {
    mongoose.connect(MongooseURL, {
        useNewUrlParser: true,
    });
};
module.exports = initial;