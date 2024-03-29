const mongoose = require('mongoose')
const PAYMENTMODEL = new mongoose.Schema(
  {
    receipt_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RECEIPTMODEL',
      required: true,
    },
    payment_method: {
      type: String,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    date_payment: {
      type: Date,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('payments', PAYMENTMODEL)
