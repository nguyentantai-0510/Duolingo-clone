const mongoose = require("mongoose");
const Types = new mongoose.Schema({
    type_name: {
        type: "String",
        required: true,
    },
});
module.exports =  mongoose.model("Types", Types);
