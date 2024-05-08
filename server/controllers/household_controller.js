const TENANTMODEL = require('../models/tenant')
const httpStatusCodes = require('../constants/constants')
const cloudinary = require('cloudinary').v2

// ?* Tested API
module.exports.fetch_all_household = async (req, res) => {
  try {
    const { user_id } = req.params
    const tenant = await TENANTMODEL.findOne({ user_id: user_id })
    if (!tenant)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Household head not found' })

    return res.status(httpStatusCodes.OK).json({ response: tenant.household })
  } catch (err) {
    console.log({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
// ?* Tested API
module.exports.fetch_household = async (req, res) => {
  try {
    const { user_id } = req.params
    const { household_id } = req.query
    const tenant = await TENANTMODEL.findOne({ user_id: user_id })
    if (!tenant)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Household head not found' })

    const household = tenant.household.filter(
      (item) => item.id.toString() === household_id,
    )
    if (!household)
      return res.status(httpStatusCodes).json({ error: 'Household not found' })

    return res.status(httpStatusCodes.OK).json({response:household})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
// * Tested API
module.exports.create_household = async (req, res) => {
  try {
    const { user_id } = req.params
    const { name, relationship, birthday, mobile } = req.body
    const details = {}
    if (name !== '') details.name = name
    if (relationship !== '') details.relationship = relationship
    if (mobile !== '') details.mobile = mobile
    if (birthday !== '') details.birthday = birthday

    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      throw new Error({ error: 'Invalid to create household...' })
    }
    const household_index = response.household.findIndex(
      (item) => item.name.toString() === name,
    )
    if (household_index === -1) {
      response.household.push(details)
    } else {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Household already exists.' })
    }

    const saved_response = await response.save()
    if (!saved_response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to save household information' })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Created household successfully!', response:details  })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
// * Tested API
module.exports.update_household = async (req, res) => {
  const { user_id } = req.params
  const { household_id } = req.query
  const { name, relationship, birthday, mobile } = req.body
  const details = {}

  if (name !== '') details.name = name

  if (relationship !== '') details.relationship = relationship

  if (birthday !== '') details.birthday = birthday

  if (mobile !== '') details.mobile = mobile

  try {
    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to Update.' })
    }
    const match = response.household.forEach((data, index) => {
      response.household[index].name.toString() === name
    })
    if (match) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        error: 'Unable to Update Household Information1.',
      })
    }
    const index = response.household.findIndex(
      (item) => item._id.toString() === household_id,
    )
    if (index === -1) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        error: 'Unable to Update Household Information2.',
      })
    }

    Object.keys(details).forEach((detail) => {
      if (details[detail] !== undefined) {
        response.household[index][detail] = details[detail]
      }
    })
    await response.save()
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Information Updated...', response:response.household[index]})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
// * Tested API
module.exports.delete_household = async (req, res) => {
  try {
    const { user_id } = req.params
    const { household_id } = req.query
    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }
    const index = response.household.findIndex(
      (item) => item._id.toString() === household_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unable to locate household' })
    }
    console.log(response.household[index])
    response.household.splice(index, 1)
    await response.save()
    return res.status(httpStatusCodes.OK).json({ msg: 'Removed household', response: response.household[index]})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message})
  }
}
