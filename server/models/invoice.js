const mongoose = require('mongoose')

const INVOICEMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenant',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    pdf: {
      public_id: {
        type: String,
      },
      pdf_url: {
        type: String,
      },
      reference: {
        type: String,
      },
    },
    intent: {
      clientKey: {
        type: String,
      },
      paymentIntent: {
        type: String,
      },
    },
    payment: {
      method_id: {
        type: String,
        default: null,
      },
      method: {
        type: String,
        default: null,
      },
      amountPaid: {
        type: Number,
      },
    },
    status: {
      type: String,
      default: 'Pending',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    datePaid: {
      type: Date,
      default: null,
    },
    due: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('invoice', INVOICEMODEL)
