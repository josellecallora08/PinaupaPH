const mongoose = require('mongoose')

const INVOICEMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenant',
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    pdf: {
      public_id: {
        type: String
      },
      pdf_url: {
        type: String
      },
      reference: {
        type: String
      }
    },
    status: {
      type: Boolean,
      default: 0
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('invoice', INVOICEMODEL)
