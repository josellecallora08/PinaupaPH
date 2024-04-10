const mongoose = require('mongoose')

const TOKENMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default:Date.now,
    },
  },
  { timestamps: true },
)

TOKENMODEL.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 60,
  }
)

module.exports = mongoose.model('tokens', TOKENMODEL)
