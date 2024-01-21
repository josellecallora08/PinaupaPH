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

module.exports = mongoose.model("contract", CONTRACTMODEL)
