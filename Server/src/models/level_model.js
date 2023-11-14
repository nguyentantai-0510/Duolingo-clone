const mongoose = require('mongoose');
const Levels = new mongoose.Schema({
    user: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "Users",
    },
    questions: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "Questions",
    },
    dayTask: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Levels", Levels);
