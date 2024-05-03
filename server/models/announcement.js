const mongoose = require('mongoose')

const ANNOUCEMENTMODEL = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required:true
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

module.exports = mongoose.model('announcements', ANNOUCEMENTMODEL)