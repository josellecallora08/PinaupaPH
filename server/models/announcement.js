const mongoose = require('mongoose')

const ANNOUCEMENTMODEL = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 0
    }
    
}, {timestamps: true})

module.exports = mongoose.model('annoucements', ANNOUCEMENTMODEL)