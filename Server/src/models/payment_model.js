const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
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
module.exports = mongoose.model('Payments', paymentSchema);