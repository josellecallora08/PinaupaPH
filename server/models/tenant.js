const mongoose = require('mongoose');

const DOCUMENTMODEL = new mongoose.Schema({
  url: { type: String, required: true }, // URL of the document stored in Cloudinary
  public_id: { type: String, required: true }, // Public ID returned by Cloudinary
  name: { type: String, required: true }
}, { timestamps: true }); // Disable _id generation for subdocuments

const HOUSEHOLDMODEL = new mongoose.Schema({
  name: { type: String },
  relationship: { type: String },
  birthday: { type: Date },
  mobile: { type: String }
}, { timestamps: true });

const PETMODEL = new mongoose.Schema({
  name: { type: String },
  species: { type: String },
  birthday: { type: Date }
}, { timestamps: true });

const TENANTMODEL = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'units' },
  apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'apartments' },
  deposit: { type: Number, default: 0 },
  advance: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  monthly_due: { type: Date, default: Date.now },
  household: [HOUSEHOLDMODEL],
  pet: [PETMODEL],
  documents: [DOCUMENTMODEL] // Array of documents
}, { timestamps: true });

module.exports = mongoose.model('tenants', TENANTMODEL);
