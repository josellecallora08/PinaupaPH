const mongoose = require('mongoose')

const COMMENTMODEL = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const REPORTMODEL = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tenants',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    attached_image: [
      {
        public_id: {
          type: String,
        },
        image_url: {
          type: String,
        },
      },
    ],
    comments: [COMMENTMODEL],
  },
  { timestamps: true },
)

module.exports = mongoose.model('reports', REPORTMODEL)
