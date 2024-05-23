const mongoose = require('mongoose')

const NOTIFMODEL = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    type: {
      type: String,
      enum: ['Payment', 'Comment', 'Announcement', 'Report'],
      default: null,
    },
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('notifications', NOTIFMODEL)
