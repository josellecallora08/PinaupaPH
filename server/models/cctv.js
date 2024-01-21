const mongoose = require('mongoose')

const CCTVMODEL = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
    },
    password:{
        type:String
    },
    port:{
        type:Number
    },
    ip_address:{
        type:String
    }
},{timestamps: true})

module.exports = mongoose.model("cctv", CCTVMODEL)
