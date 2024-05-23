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
    },
    tenants: [
      {
        tenant_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tenants',
        },
        moveIn: {
          type: Date,
          default: null,
        },
        moveOut: {
          type: Date,
          default: null,
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('units', UNITMODEL)
