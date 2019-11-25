'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let TodoSchema = new Schema({


    title: {
        type: String,
        required: "title is required"
    },
 
completed :{
 type: false
} 
,

editing: {
    type:false
}
,
description :{
    type : String
},

modifiedDate : {
    type: Date,
    default: Date.now
}
  

}, {
    versionKey: false
});



TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('todos', TodoSchema);