const NOTIFMODEL = require('../models/notification')
const TENANTMODEL = require('../models/tenant')
const httpStatusCodes = require('../constants/constants')
module.exports.fetchNotifications = async (req, res) => {
  try {
    const response = await NOTIFMODEL.find()
      .populate('sender_id receiver_id')
      .sort({ createdAt: -1 })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Notification is empty...' })
    }
    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchNotification = async (req, res) => {
  try {
    const tenant_id = req.user.id
    console.log(tenant_id)
    const response = await NOTIFMODEL.findOne({
      receiver_id: tenant_id,
    })
      .populate('sender_id receiver_id')
      .sort({ createdAt: -1 })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Notification is empty...' })
    }
    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.deleteNotification = async (req, res) => {
  try {
    const { notif_id } = req.query
    const response = await NOTIFMODEL.findByIdAndDelete(notif_id).populate(
      'sender_id receiver_id',
    )
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Notification is empty...' })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Notification has been deleted.', response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.readNotification = async (req, res) => {
  try {
    const { notif_id } = req.query
    const response = await NOTIFMODEL.findByIdAndUpdate(notif_id, {
      isRead: true,
    }).populate('sender_id receiver_id')
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Notification is empty...' })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Notification has been read.', response })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
