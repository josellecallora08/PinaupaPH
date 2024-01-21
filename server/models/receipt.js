const mongoose = require('mongoose')


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

module.exports = mongoose.model("receipt", RECEIPTMODEL)
