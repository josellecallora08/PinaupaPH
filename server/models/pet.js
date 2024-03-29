const mongoose = require('mongoose')

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

module.exports = mongoose.model('pets', PETMODEL)
