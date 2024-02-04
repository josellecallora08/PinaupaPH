const mongoose = require('mongoose')

const USERMODEL = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unqiue: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: Number,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    profile_image: {
      type: String,
    },
    role: {
      type: String,
      default: 'Tenant',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('user', USERMODEL)
