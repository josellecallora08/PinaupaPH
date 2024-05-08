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
      type: String,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    profile_image: {
      image_url: String,
      public_id: String,
    },
    role: {
      type: String,
      enum: ['Superadmin', 'Admin', 'Tenant'],
      default: 'Tenant',
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      },
    },
    timestamps: true,
  },
)

module.exports = mongoose.model('user', USERMODEL)
