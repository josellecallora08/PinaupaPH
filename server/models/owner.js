const mongoose = require('mongoose')

const CONTRACTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL',
        required: true
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UNITMODEL'
    },
    number_months:{
        type:Number,
    },
    from_month:{
        type: Date
    },
    to_month:{
        type:Date
    }
}, {timestamps: true})

const RECEIPTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL',
        required: true
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UNITMODEL'
    },
    amount:{
        type:Number
    },
    from_month:{
        type:Date
    },
    to_month:{
        type:Date
    },
    date_payment:{
        type:Date
    }
},{timestamps})

const UNITMODEL = new mongoose.Schema({
    occupied:{
        type:Boolean,
        default:false
    },
    monthly_rent:{
        type:Number
    },
    unit_no:{
        type:String
    }
})

const CCTVMODEL = new mongoose.Schema({
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
})

const OWNERMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL',
        required: true
    },
    business_name:{
        type: String
    },
    business_address:{
        type:String
    },
    contracts:[CONTRACTMODEL],
    receitps:[RECEIPTMODEL],
    units:[UNITMODEL],
    cctvs:[CCTVMODEL],
},{timestamps:true})

module.exports = mongoose.model("owner", OWNERMODEL)