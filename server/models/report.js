const mongoose = require('mongoose')

const COMMENTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL'
    },
    description:{
        type:String,
        required:true
    }
},{timestamps: true})

const REPORTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL'
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UNITMODEL'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    type:{
        type:String,
    },
    status:{
        type:Boolean,
        default: 0,
    },
    comment:[COMMENTMODEL]
},{timestamps: true})

module.exports = mongoose.model('report', REPORTMODEL)