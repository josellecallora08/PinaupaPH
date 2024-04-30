const mongoose = require('mongoose')

const RECEIPTMODEL = new mongoose.Schema(
  {
    tenant_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenant'
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
    amount: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: 0
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('receipts', RECEIPTMODEL)
