const CCTVMODEL = require('../models/cctv')
const USERMODEL = require('../models/user')
const APARTMENTMODEL = require('../models/apartment')
const httpStatusCodes = require('../constants/constants')

module.exports.fetch_cctv = async (req, res) => {
  try {
    const response = await APARTMENTMODEL.find().populate('cctvs')
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to fetch CCTV' })

    console.log(response)
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Fetched CCTV', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
}

module.exports.create_cctv = async (req, res) => {
  const { apartment_id } = req.params
  const { name, username, password, port, ip_address } = req.body
  const details = {}
  if (name !== '') {
    details.name = name
  }
  if (username !== '') {
    details.username = username
  }
  if (password !== '') {
    details.password = password
  }
  if (port !== '') {
    details.port = port
  }
  if (ip_address !== '') {
    details.ip_address = ip_address
  }
  try {
    if (await CCTVMODEL.findOne({ name: name })) {
      // Check if CCTV is existing
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'CCTV Exists' })
    }

    const response = await CCTVMODEL.create(details) // Save CCTV Details on the DATABASE
    if (!response)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Create CCTV Surveillance.' })

    const apartment_response = await APARTMENTMODEL.findById({
      _id: apartment_id,
    })
    if (!apartment_response)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Create CCTV Surveillance.' })
    apartment_response.cctvs.push(response._id)
    await apartment_response.save()

    return res
      .status(httpStatusCodes.CREATED)
      .json({ msg: 'Successfully added CCTV camera.' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
}

module.exports.update_cctv = async (req, res) => {
  const { cctv_id } = req.params
  const { name, username, password, port, ip_address } = req.body
  const details = {}
  if (name !== '') {
    details.name = name
  }
  if (username !== '') {
    details.username = username
  }
  if (password !== '') {
    details.password = password
  }
  if (port !== '') {
    details.port = port
  }
  if (ip_address !== '') {
    details.ip_address = ip_address
  }
  try {
    let response = await CCTVMODEL.findByIdAndUpdate({ _id: cctv_id }, details)
    if (!response)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Update Surveillance Information.' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Successfully Updated!' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
}

module.exports.delete_cctv = async (req, res) => {
  const { apartment_id, cctv_id } = req.params
  try {
    const apartment_response = await APARTMENTMODEL.findById({
      _id: apartment_id,
    })
    if (!apartment_response)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Delete CCTV Surveillance.' })

    const index = apartment_response.cctvs.findIndex(
      (item) => item._id.toString() === cctv_id,
    )
    if (index === -1)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Delete on array CCTV Surveillance.' })
    apartment_response.cctvs.splice(index, 1)

    await apartment_response.save()
    const response = await CCTVMODEL.findByIdAndDelete({ _id: cctv_id })
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User Not Found' })

    return res
      .status(httpStatusCodes.OK)
      .json({ message: 'CCTV deleted successfully' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
