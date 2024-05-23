const mongoose = require('mongoose')

const INVOICEMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenants',
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
        default: '',
      },
      method: {
        type: String,
        default: '',
      },
      amountPaid: {
        type: Number,
        default:0
      },
      unpaidBalance: {
        type: Number,
        default:0
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

module.exports = mongoose.model('invoices', INVOICEMODEL)
