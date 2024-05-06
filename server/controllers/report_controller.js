const REPORTMODEL = require('../models/report')
const httpStatusCodes = require('../constants/constants')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const NOTIFMODEL = require('../models/notification')
const TENANTMODEL = require('../models/tenant')
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK

module.exports.resolveReport = async (req, res) => {
  const { report_id, status } = req.query
  try {
    const report = await REPORTMODEL.findByIdAndUpdate(report_id, {
      status,
    })
    if (!report)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to edit report' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Report updated' })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to update report due to server error' })
  }
}

module.exports.searchReport = async (req, res) => {
  const { filter } = req.query
  try {
    const response = await REPORTMODEL.aggregate([
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

module.exports.createReport = async (req, res) => {
  try {
    const attached_image = req.file
    const { user_id } = req.query
    const { title, description, type } = req.body
    let imageUpload
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

    if (attached_image) {
      const b64 = Buffer.from(attached_image.buffer).toString('base64')
      let dataURI = 'data:' + attached_image.mimetype + ';base64,' + b64
      imageUpload = await cloudinary.uploader.upload(dataURI, {
        quality: 'auto:low',
        folder: 'PinaupaPH/Reports',
        resource_type: 'auto',
      })

      if (!imageUpload || !imageUpload.secure_url) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Failed to upload profile image.' })
      }
    }

    const response = await REPORTMODEL.create({
      sender_id: tenant._id,
      title,
      description,
      type,
      'attached_image.public_id': imageUpload?.public_id,
      'attached_image.image_url': imageUpload?.secure_url,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to report an issue' })
    }

    const isAdmin = await USERMODEL.findOne({ role: 'Admin' })
    if (!isAdmin) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Tenant not found' })
    }
    const sendNotif = await NOTIFMODEL.create({
      sender_id: user_id,
      receiver_id: isAdmin._id,
      type: 'Report',
      report_id: response._id,
    })
    if (!sendNotif) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to report an issue' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Report submitted successfully' })
  } catch (err) {
    console.error({ error: err.message })
    return res.status(500).json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.editReport = async (req, res) => {
  const { report_id } = req.query
  const { title, description, type, status } = req.body
  try {
    const report = await REPORTMODEL.findByIdAndUpdate(report_id, {
      title,
      description,
      type,
      status,
    })
    if (!report)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to edit report' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Report updated' })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to update report due to server error' })
  }
}

module.exports.deleteReport = async (req, res) => {
  const { report_id } = req.query
  try {
    const response = await REPORTMODEL.findByIdAndDelete(report_id)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Report has been deleted.' })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to delete report due to server error' })
  }
}
module.exports.fetchReports = async (req, res) => {
  try {
    const response = await REPORTMODEL.find()
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
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to fetch reports due to server error' })
  }
}

module.exports.fetchReport = async (req, res) => {
  const { report_id } = req.query
  try {
    const response = await REPORTMODEL.findById(report_id)
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
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to fetch report due to server error' })
  }
}

module.exports.createComment = async (req, res) => {
  const { user_id, report_id } = req.query
  const { comment, url } = req.body
  try {
    const response = await REPORTMODEL.findById(report_id)
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Report not found' })

    const details = { user_id, comment }
    response.comments.push(details)
    await response.save()
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Comment sent.', response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.editComment = async (req, res) => {
  const { comment_id, report_id } = req.query
  const { comment } = req.body
  try {
    const response = await REPORTMODEL.findById(report_id)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

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
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.deleteComment = async (req, res) => {
  const { comment_id } = req.query
  const { report_id } = req.params

  try {
    const report = await REPORTMODEL.findById(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    const index = report.comments.findIndex(
      (item) => item._id.toString() === comment_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to delete comment' })
    }

    report.comments.splice(index, 1)
    await report.save()
    return res.status(httpStatusCodes.OK).json({ msg: 'Comment deleted.' })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.fetchComments = async (req, res) => {
  const { report_id } = req.query
  try {
    const report =
      await REPORTMODEL.findById(report_id).populate('comments.user_id')
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json({ response: report.comments })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.fetchComment = async (req, res) => {
  const { report_id, comment_id } = req.query
  try {
    const report = await REPORTMODEL.findById(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    const comment = report.comments.filter(
      (item) => item._id.toString() === comment_id,
    )
    if (comment.length === 0) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Comment not found' })
    }
    return res.status(httpStatusCodes.OK).json(comment)
  } catch (error) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
