const mongoose = require('mongoose')

const COMMENTMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const REPORTMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    comments: [COMMENTMODEL],
  },
  { timestamps: true },
)

module.exports = mongoose.model('reports', REPORTMODEL)
