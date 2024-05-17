const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')
const NOTIFMODEL = require('../models/notification')
const ANNOUNCEMENTMODEL = require('../models/announcement')
const httpStatusCodes = require('../constants/constants')

module.exports.searchAnnouncement = async (req, res) => {
  try {
    const { filter } = req.query

    const response = await ANNOUNCEMENTMODEL.find({
      $or: [
        { type: { $regex: filter, $options: 'i' } },
        { title: { $regex: filter, $options: 'i' } },
        { description: { $regex: filter, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 })

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error(err.message)
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
}

module.exports.createAnnouncement = async (req, res) => {
  try {
    const id = req.user.id
    const role = req.user.role
    const { title, type, description } = req.body
    const details = {}
    details.user_id = id
    if (title !== '') details.title = title
    if (type !== '') details.type = type
    if (description !== '') details.description = description

    if (role !== 'Admin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Only Admin can create announcements...' })
    }
    const response = await ANNOUNCEMENTMODEL.create(details)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create announcement' })
    }
    const tenants = await TENANTMODEL.find()
    if (!tenants) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create announcement' })
    }
    await Promise.all(
      tenants.map(async (user) => {
        await NOTIFMODEL.create({
          sender_id: id,
          receiver_id: user.user_id,
          type: 'Announcement',
          title: title,
          description: description,
          url: '/dashboard',
        })
      }),
    )

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Announcement has been sent to all tenants.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchAnnouncements = async (req, res) => {
  try {
    const response = await ANNOUNCEMENTMODEL.find().sort({ createdAt: -1 })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'No announcement...' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchAnnouncement = async (req, res) => {
  const { announcement_id } = req.query
  try {
    const response = await ANNOUNCEMENTMODEL.findById(announcement_id).sort({
      createdAt: -1,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Annoucement not found...' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.editAnnouncement = async (req, res) => {
  const { announcement_id } = req.query
  const details = {}
  const { title, type, description } = req.body
  if (title !== '') details.title = title
  if (type !== '') details.type = type
  if (description !== '') details.description = description
  details.status = true

  try {
    const response = await ANNOUNCEMENTMODEL.findByIdAndUpdate(
      announcement_id,
      details,
      {
        new: true,
      },
    )
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create announcement' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Announcement has been edited to all tenants.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.deleteAnnouncement = async (req, res) => {
  const { announcement_id } = req.query
  try {
    const response = await ANNOUNCEMENTMODEL.findByIdAndDelete(announcement_id)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create announcement' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Announcement has been deleted to all tenants.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
module.exports.recentAnnouncement = async (req, res) => {
  try {
    const response = await ANNOUNCEMENTMODEL.findOne()
      .populate('user_id')
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(1)

    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create announcement' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Fetched Recent Announcement', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
