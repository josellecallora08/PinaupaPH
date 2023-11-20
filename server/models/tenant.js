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
        default:'Unpaid'
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
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL',
        required: true
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
    payment_history:[PAYMENTMODEL],
    household: [HOUSEHOLDMODEL],
    pet: [PETMODEL]
})

module.exports = mongoose.model('tenant', TENANTMODEL)