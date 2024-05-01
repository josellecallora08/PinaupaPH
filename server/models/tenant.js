const mongoose = require('mongoose')

const PAYMENTMODEL = new mongoose.Schema(
  {
    receipt_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'receipt',
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

const HOUSEHOLDMODEL = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    relationship:{
      type: String,
    },
    birthday: {
      type: Date,
    },
    mobile: {
      type: Number,
    },
  },
  { timestamps: true },
)

const PETMODEL = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    species: {
      type: String,
    },
    birthday: {
      type: Date,
    },
  },
  { timestamps: true },
)

const TENANTMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'units',
    },
    apartment_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'apartment'
    },
    deposit: {
      type: Number,
      default: 0,
    },
    advance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    monthly_due: {
      type: Date,
      default: Date.now(),
    },
    payment: [PAYMENTMODEL],
    household: [HOUSEHOLDMODEL],
    pet: [PETMODEL],
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('tenant', TENANTMODEL)
