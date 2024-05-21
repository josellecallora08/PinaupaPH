const mongoose = require('mongoose')

const OTPMODEL = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pin: {
        type: String
    },
    expiry: {
        type: Date
    },
    attempts: {
        type: Number,
        default: 5
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('temporary-otp', OTPMODEL)