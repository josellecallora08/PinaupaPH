const mongoose = require('mongoose')

const PAYMENTMODEL = new mongoose.Schema({
    receipt_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'RECEIPTMODEL',
        required:true
    },
    payment_method:{
        type:String
    },
    payment_status:{
        type:Boolean,
        default:false
    },
    date_payment:{
        type:Date
    }
}, {timestamps: true})

const HOUSEHOLDMODEL = new mongoose.Schema({
    name:{
        type:String
    },
    relationship:{
        type:String
    },
    birthday:{
        type:Date
    },
    mobile:{
        type:Number
    }
}, {timestamps: true})

const PETMODEL = new mongoose.Schema({
    name: {
        type:String,
    },
    species: {
        type: String,
    },
    birthday: {
        type: Date
    }
}, {timestamps: true})

const TENANTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'units',
        required: true
    },
    deposit:{
        type:Number,
        default: null,
    },
    advance:{
        type:Number,
        default: null
    },
    balance:{
        type:Number,
        default: null,
    },
    monthly_due:{
        type:Date,
        default: null
    },
    payment:[PAYMENTMODEL],
    household: [HOUSEHOLDMODEL],
    pet: [PETMODEL]
},{timestamps: true})

module.exports = mongoose.model('tenant', TENANTMODEL)