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
},{timestamps: true})

// const UNITMODEL = new mongoose.Schema({
//     occupied:{
//         type:Boolean,
//         default:false
//     },
//     monthly_rent:{
//         type:Number
//     },
//     unit_no:{
//         type:String
//     }
// })

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
},{timestamps: true})

const OWNERMODEL = new mongoose.Schema({
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
    business_name:{
        type: String
    },
    business_address:{
        type:String
    },
    contracts:[CONTRACTMODEL],
    receitps:[RECEIPTMODEL],
    cctvs:[CCTVMODEL],
},{timestamps:true})

module.exports = mongoose.model("owner", OWNERMODEL)