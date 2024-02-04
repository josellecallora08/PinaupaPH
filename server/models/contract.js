const mongoose = require('mongoose')

const WITNESSMODEL = new mongoose.Schema({
  name: {
    type: String,
  },
})

const CONTRACTMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'units',
    },
    contract_id: {
      type: String,
    },
    advance: {
      type: Number,
    },
    witnesses: [WITNESSMODEL],
  },
  { timestamps: true },
)

module.exports = mongoose.model('contract', CONTRACTMODEL)
