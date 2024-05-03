const TENANTMODEL = require('../models/tenant')
const httpStatusCodes = require('../constants/constants')
// * Tested API
module.exports.fetch_all_pets = async (req, res) => {
  try {
    const { user_id } = req.params
    const tenant = await TENANTMODEL.findOne({ user_id: user_id })
    if (!tenant)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Tenant not found' })

    return res.status(httpStatusCodes.OK).json({ response: tenant.pet })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
// * Tested API
module.exports.fetch_pet = async (req, res) => {
  try {
    const { user_id } = req.params
    const { pet_id } = req.query
    const tenant = await TENANTMODEL.findOne({ user_id: user_id })
    if (!tenant)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Tenant not found' })

    const pet = tenant.pet.filter((item) => item._id.toString() === pet_id)
    if (!pet)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: `Pet not found` })

    return res.status(httpStatusCodes.OK).json(pet)
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
// * Tested API
module.exports.create_pet = async (req, res) => {
  try {
    const { user_id } = req.params
    const { name, birthday, species } = req.body
    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid to create pet...' })
    }
    const details = { name, birthday, species }
    const pet_index = response.pet.findIndex(
      (item) => item.name.toString() === name,
    )
    if (pet_index === -1) {
      response.pet.push(details)
    } else {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Pet already exists.' })
    }

    const saved_response = await response.save()
    if (!saved_response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to save pet information' })
    }
    return res
      .status(httpStatusCodes.CREATED)
      .json({ msg: 'Created pet successfully!' })
  } catch (err) {
    // console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
// * Tested API
module.exports.update_pet = async (req, res) => {
  try {
    const { user_id } = req.params
    const { pet_id } = req.query
    const { name, birthday, species } = req.body
    const details = {}

    if (name !== '') details.name = name

    if (birthday !== '') details.birthday = birthday

    if (species !== '') details.species = species

    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unable to Update Information...' })
    }

    const index = response.pet.findIndex(
      (item) => item._id.toString() === pet_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to Locate Pet' })
    }
    Object.keys(details).forEach((item) => {
      if (details[item] !== '') {
        response.pet[index][item] = details[item]
      }
    })
    await response.save()
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Information Updated...' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// * Tested API
module.exports.delete_pet = async (req, res) => {
  try {
    const { user_id } = req.params
    const { pet_id } = req.query
    const response = await TENANTMODEL.findOne({ user_id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }
    const index = response.pet.findIndex(
      (item) => item._id.toString() === pet_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Pet not found' })
    }
    response.pet.splice(index, 1)
    await response.save()
    return res.status(httpStatusCodes.OK).json({ msg: 'Removed Pet' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
}
