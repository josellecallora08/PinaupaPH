const mongoose = require('mongoose')

const NOTIFMODEL = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    type: {
        type: String,
        enum: ['Payment', 'Comment', 'Announcement', 'Report'],
        default: null
    },
    announcement_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'announcements'
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports.comments'
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invoice'
    },
    report_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isShown: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('notifications', NOTIFMODEL)