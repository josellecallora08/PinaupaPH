const mongoose = require('mongoose')

const WITNESSMODEL = new mongoose.Schema({
  name: {
    type: String,
  },
})

const CONTRACTMODEL = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenants',
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
    witnesses: [WITNESSMODEL],
  },
  { timestamps: true },
)

module.exports = mongoose.model('contracts', CONTRACTMODEL)
