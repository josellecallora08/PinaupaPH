const mongoose = require('mongoose')

const UNITMODEL = new mongoose.Schema({
    occupied:{
        type:Boolean,
        default:false
    },
    rent:{
        type:Number
    },
    unit_no:{
        type:String,
    }
},{timestamps: true})

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
    units:[UNITMODEL],

},{timestamps: true})

module.exports = mongoose.model('apartment', APARTMENTMODEL)