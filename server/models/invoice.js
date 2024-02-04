const mongoose = require('mongoose')

const INVOICEMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'units',
    },
    reference: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    due: {
      type: Date,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('invoice', INVOICEMODEL)
