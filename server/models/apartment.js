const mongoose = require('mongoose')


const APARTMENTMODEL = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,    
    },
    address:{
        type:String,
        required:true
    },
    province:{
        type:String,
    },
    barangay:{
        type:String
    },
    units:[{type:mongoose.Schema.Types.ObjectId, ref: "units"}],

},{timestamps: true})

module.exports = mongoose.model('apartment', APARTMENTMODEL)