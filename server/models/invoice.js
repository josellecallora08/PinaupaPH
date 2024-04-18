const mongoose = require('mongoose')

const INVOICEMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenant',
    },
    reference: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: 0
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('invoice', INVOICEMODEL)
