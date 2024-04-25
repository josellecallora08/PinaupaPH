const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')
const ANNOUCEMENTMODELMODEL = require('../models/announcement')
const httpStatusCodes = require('../constants/constants')

module.exports.createAnnouncement = async (req, res) => {
    try {
        const response = await ANNOUCEMENTMODELMODEL.create({})
        if (!response) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Unable to create announcement" })
        }

        return res.status(httpStatusCodes.OK).json({ msg: "Announcement has been sent to all tenants.", response })
    } catch (err) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

module.exports.fetchAnnouncements = async (req, res) => {
    try {
        const response = await ANNOUCEMENTMODELMODEL.find({})
        if (!response) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Unable to find announcement" })
        }

        return res.status(httpStatusCodes.OK).json({ response })
    } catch (err) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

module.exports.fetchAnnouncement = async (req, res) => {
    const { announcement_id } = req.query
    try {
        const response = await ANNOUCEMENTMODELMODEL.findbyId(announcement_id)
        if (!response) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Unable to create announcement" })
        }

        return res.status(httpStatusCodes.OK).json({ response })
    } catch (err) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

module.exports.editAnnouncement = async (req, res) => {
    const { announcement_id } = req.query
    const details = {}
    try {
        const response = await ANNOUCEMENTMODELMODEL.findbyIdAndUpdate(announcement_id, { details })
        if (!response) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Unable to create announcement" })
        }

        return res.status(httpStatusCodes.OK).json({ msg: "Announcement has been edited to all tenants.", response })
    } catch (err) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

module.exports.deleteAnnouncement = async (req, res) => {
    const { announcement_id } = req.query
    try {
        const response = await ANNOUCEMENTMODELMODEL.findbyIdAndDelete(announcement_id)
        if (!response) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Unable to create announcement" })
        }

        return res.status(httpStatusCodes.OK).json({ msg: "Announcement has been deleted to all tenants.", response })
    } catch (err) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}