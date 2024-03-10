const mongoose = require('mongoose')

const APARTMENTMODEL = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    province: {
      type: String,
    },
    barangay: {
      type: String,
    },
    image:{
      apartment_image_url: String,
      apartment_public_id: String
    },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'units' }],
    cctvs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cctvs' }],
  },
  { timestamps: true },
)

module.exports = mongoose.model('apartment', APARTMENTMODEL)
