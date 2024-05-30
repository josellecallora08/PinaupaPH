const CONCERNMODEL = require('../models/concern')
const httpStatusCodes = require('../constants/constants')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const NOTIFMODEL = require('../models/notification')
const TENANTMODEL = require('../models/tenant')
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK

module.exports.resolveConcern = async (req, res) => {
  const { concern_id, status } = req.query
  try {
    const response = await CONCERNMODEL.findByIdAndUpdate(concern_id, {
      status,
    }).populate({
      path: 'sender_id',
      populate: 'user_id unit_id apartment_id'
    })
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to edit concern' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Concern has been resolved.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to update concern due to server error' })
  }
}

module.exports.searchConcern = async (req, res) => {
  const { filter } = req.query
  try {
    const response = await CONCERNMODEL.aggregate([
      {
        $lookup: {
          from: 'tenants',
          localField: 'sender_id',
          foreignField: '_id',
          as: 'tenant',
        },
      },
      {
        $unwind: '$tenant',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tenant.user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'units',
          localField: 'tenant.unit_id',
          foreignField: '_id',
          as: 'unit',
        },
      },
      {
        $unwind: '$unit',
      },
      {
        $match: {
          $or: [
            { 'user.name': { $regex: filter, $options: 'i' } },
            { 'unit.unit_no': { $regex: filter, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          sender_id: {
            user_id: '$user',
            unit_id: '$unit',
            deposit: '$tenant.deposit',
            advance: '$tenant.advance',
            balance: '$tenant.balance',
            monthly_due: '$tenant.monthly_due',
            payment: '$tenant.payment',
            household: '$tenant.household',
            pet: '$tenant.pet',
            createdAt: '$tenant.createdAt',
            updatedAt: '$tenant.updatedAt',
          },
          title: 1,
          description: 1,
          type: 1,
          status: 1,
          attached_image: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ])
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'No data found...' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.createConcern = async (req, res) => {
  try {
    const attached_image = req.files
    const { user_id } = req.query
    const { title, description, type, url } = req.body
    let imageUploads = []

    if (title === '' || description === '' || type === '') {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Please fill all the blanks.' })
    }

    const tenant = await TENANTMODEL.findOne({ user_id: user_id }).populate(
      'user_id unit_id apartment_id',
    )
    if (!tenant) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Tenant not found' })
    }

    if (attached_image && attached_image.length > 0) {
      for (const file of attached_image) {
        const b64 = Buffer.from(file.buffer).toString('base64')
        let dataURI = 'data:' + file.mimetype + ';base64,' + b64
        const imageUpload = await cloudinary.uploader.upload(dataURI, {
          quality: 'auto:low',
          folder: 'PinaupaPH/Concerns',
          resource_type: 'auto',
        })

        if (!imageUpload || !imageUpload.secure_url) {
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Failed to upload one or more images.' })
        }

        imageUploads.push({
          public_id: imageUpload.public_id,
          image_url: imageUpload.secure_url,
        })
      }
    }

    const response = await CONCERNMODEL.create({
      sender_id: tenant._id,
      title,
      description,
      type,
      attached_image: imageUploads, // Save all uploaded images
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to concern an issue' })
    }

    const isAdmin = await USERMODEL.findOne({ role: 'Admin' })
    if (!isAdmin) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Admin not found' })
    }
    const sendNotif = await NOTIFMODEL.create({
      sender_id: user_id,
      receiver_id: isAdmin._id,
      title: 'Concerns',
      type: 'Concern',
      description: `Concerned ${type} today.`,
    })
    if (!sendNotif) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to send notification' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Concern submitted successfully', response })
  } catch (err) {
    console.error({ error: err.message })
    return res.status(500).json({ error: `Server Error: ${err.message}` })
  }
}

module.exports.editConcern = async (req, res) => {
  const { concern_id } = req.query
  const { title, description, type, status } = req.body
  try {
    const response = await CONCERNMODEL.findByIdAndUpdate(concern_id, {
      title,
      description,
      type,
      status,
    })
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to edit concern' })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Concern updated', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to update concern due to server error' })
  }
}

module.exports.deleteConcern = async (req, res) => {
  const { concern_id } = req.query
  try {
    const response = await CONCERNMODEL.findByIdAndDelete(concern_id)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Concern has been deleted.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to delete concern due to server error' })
  }
}
module.exports.fetchConcerns = async (req, res) => {
  try {
    const response = await CONCERNMODEL.find()
      .populate('comments.user_id')
      .populate({
        path: 'sender_id',
        populate: {
          path: 'user_id unit_id',
        },
      })
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchConcern = async (req, res) => {
  const { concern_id } = req.query
  try {
    const response = await CONCERNMODEL.findById(concern_id)
      .populate('comments.user_id')
      .populate({
        path: 'sender_id',
        populate: {
          path: 'user_id unit_id',
        },
      })
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to fetch concern due to server error' })
  }
}

module.exports.createComment = async (req, res) => {
  const { user_id, concern_id } = req.query
  const { comment, url } = req.body
  try {
    const response = await CONCERNMODEL.findById(concern_id)
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Concern not found' })

    const details = { user_id, comment }
    response.comments.push(details)
    await response.save()
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Comment sent.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.editComment = async (req, res) => {
  const { comment_id, concern } = req.query
  const { comment } = req.body
  try {
    const response = await CONCERNMODEL.findById(concern)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    const index = response.comments.findIndex(
      (item) => item._id.toString() === comment_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update comment' })
    }

    response.comments[index].comment = comment
    await response.save()
    return res.status(httpStatusCodes.OK).json({ msg: 'Comment updated' })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.deleteComment = async (req, res) => {
  const { comment_id } = req.query
  const { concern_id } = req.params

  try {
    const response = await CONCERNMODEL.findById(concern_id)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    const index = response.comments.findIndex(
      (item) => item._id.toString() === comment_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to delete comment' })
    }

    response.comments.splice(index, 1)
    await response.save()
    return res.status(httpStatusCodes.OK).json({ msg: 'Comment deleted.' })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.fetchComments = async (req, res) => {
  const { concern_id } = req.query
  try {
    const concern =
      await CONCERNMODEL.findById(concern_id).populate('comments.user_id')
    if (!concern)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    return res.status(httpStatusCodes.OK).json({ response: concern.comments })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.fetchComment = async (req, res) => {
  const { concern_id, comment_id } = req.query
  try {
    const concern = await CONCERNMODEL.findById(concern_id)
    if (!concern)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Concern not found' })

    const comment = concern.comments.filter(
      (item) => item._id.toString() === comment_id,
    )
    if (comment.length === 0) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Comment not found' })
    }
    return res.status(httpStatusCodes.OK).json(comment)
  } catch (error) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
