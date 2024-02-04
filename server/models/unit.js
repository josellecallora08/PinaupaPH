const mongoose = require('mongoose')

const UNITMODEL = new mongoose.Schema(
  {
    occupied: {
      type: Boolean,
      default: false,
    },
    rent: {
      type: Number,
    },
    unit_no: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('units', UNITMODEL)
