const mongoose = require('mongoose')

const CONTRACTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'units'
    },
    from_date:{
        type: Date
    },
    to_date:{
        type:Date
    }
}, {timestamps: true})

const RECEIPTMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'units'
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

const INVOICEMODEL = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    unit_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'units'
    },
    amount:{
        type:Number,
        required:true
    },
    from:{
        type:Date
    },
    to:{
        type:Date
    },
    due:{
        type:Date
    }
}, {timestamps: true})

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

const OWNERMODEL = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    contracts:[{type:mongoose.Schema.Types.ObjectId,
                ref:'contracts'}],
    receitps:[RECEIPTMODEL],
    invoice:[INVOICEMODEL],
    cctvs:[CCTVMODEL],
},{timestamps:true})

module.exports = mongoose.model("owner", OWNERMODEL)