const mongoose = require('mongoose')

const ANNOUCEMENTMODEL = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true})

module.exports = mongoose.model('annoucements', ANNOUCEMENTMODEL)