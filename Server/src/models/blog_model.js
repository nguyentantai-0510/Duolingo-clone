const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        userName:{
            type:String,
            required: true
        }
    }
},{ timestamps: true });
module.exports = mongoose.model('Blogs', blogSchema);