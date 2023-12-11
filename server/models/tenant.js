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
    name:{
        type: String,
        required: true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unqiue:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    mobile_no:{
        type:Number,
        unique:true,
        required: true
    },
    birthday:{
        type:Date,
        required: true,
    },
    profile_image:{
        type:String,
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UNITMODEL'
    },
    deposit:{
        type:Number,
    },
    balance:{
        type:Number,
    },
    monthly_due:{
        type:Date
    },
    payment:[PAYMENTMODEL],
    household: [HOUSEHOLDMODEL],
    pet: [PETMODEL]
},{timestamps: true})

module.exports = mongoose.model('tenant', TENANTMODEL)