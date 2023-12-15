const {mongoose} = require('mongoose')

const COMMENTMODEL = new mongoose.Schema({
    tenant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TENANTMODEL'
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OWNERMODEL'
    },
    description:{
        type:String,
        required:true
    }
},{timestamps: true})

const REPORTMODEL = new mongoose.Schema({
    tenant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TENANTMODEL'
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