const REPORTMODEL = require('../models/report')
const httpStatusCodes = require('../constants/constants')

module.exports.createReport = async (req, res) => {
  try {
    const { user_id } = req.params
    const { unit_id } = req.query
    const { title, description, image, type } = req.body
    const details = {}
    if (user_id !== '') details.user_id = user_id
    if (!unit_id) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit ID not found' })
    } else {
      details.unit_id = unit_id
    }
    if (title !== '') details.title = title
    if (description !== '') details.description = description
    // if(image !== '') details.image = image
    if (type !== '') details.type = type

    const response = await REPORTMODEL.create(details)
    if (!response) {
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
    const report = await REPORTMODEL.findByIdAndDelete(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Report deleted.' })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to delete report due to server error' })
  }
}

module.exports.fetchReports = async (req, res) => {
  try {
    const report = await REPORTMODEL.find().sort({ createdAt: -1 })
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json(report)
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
    const report = await REPORTMODEL.findById(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json(report)
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unable to fetch report due to server error' })
  }
}

module.exports.createComment = async (req, res) => {
  const { user_id, report_id } = req.params
  const { comment } = req.body
  try {
    const report = await REPORTMODEL.findById(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Report not found' })

    const details = { user_id, comment }
    report.comments.push(details)
    await report.save()
    return res.status(200).json({ msg: 'Comment sent.' })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: `Server Error: ${err.message}` })
  }
}

module.exports.editComment = async (req, res) => {
  const { report_id } = req.params
  const { comment_id } = req.query
  const { comment } = req.body
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
        .json({ error: 'Unable to update comment' })
    }

    report.comments[index].comment = comment
    await report.save()
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
  const { report_id } = req.params
  try {
    const report = await REPORTMODEL.findById(report_id)
    if (!report)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Report not found' })

    return res.status(httpStatusCodes.OK).json(report.comments)
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
module.exports.fetchComment = async (req, res) => {
  const { report_id } = req.params
  const { comment_id } = req.query
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
