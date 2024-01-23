const mongoose = require('mongoose')

const CCTVMODEL = new mongoose.Schema({
    apartment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'apartment'
    },
    name:{
        type:String,
        unique:true
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
