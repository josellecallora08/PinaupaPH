const mongoose = require('mongoose')

const NOTIFMODEL = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    type: {
        type: String,
        enum: [null, 'Payment', 'Comment', 'Announcement'],
        default: null
    },
    description: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model('notifications', NOTIFMODEL)