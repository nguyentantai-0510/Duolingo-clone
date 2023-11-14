const mongoose = require('mongoose');
const Questions = new mongoose.Schema({
    question:{
        type: 'String',
        required: true
    },
    options:[{
        option:{
            type:"String",
            required: true
        },
        result:{
            type:"Boolean",
            required: true
        }  
    }],
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Types"
    },
})

module.exports=mongoose.model('questions', Questions);