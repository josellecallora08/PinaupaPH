const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const httpStatusCodes = require('../constants/constants')

module.exports.fetch_apartment = async (req, res) => {
  try {
    const response = await APARTMENTMODEL.find()
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to fetch apartment' })
    }
    return res.status(httpStatusCodes.OK).json(response)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.create_apartment = async (req, res) => {
  try {
    const { name, address, province, barangay } = req.body
    if (await APARTMENTMODEL.findOne({ name })) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Apartment Building Exists' })
    }
    let response = await APARTMENTMODEL.create({
      name,
      address,
      province,
      barangay,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to create apartment building...' })
    }
    await response.save()
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Apartment Building Created...' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.edit_apartment = async (req, res) => {
  try {
    const { apartment_id } = req.params
    const { name, address, province, barangay } = req.body
    const details = {}
    if (name !== '') {
      if (await APARTMENTMODEL.findOne({ name }))
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Apartment Building Exists' })

      details.name = name
    }
    if (address !== '') {
      details.address = address
    }
    if (province !== '') {
      details.province = province
    }
    if (barangay !== '') {
      details.barangay = barangay
    }
    const response = await APARTMENTMODEL.findByIdAndUpdate(
      { _id: apartment_id },
      details,
    )
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Apartment Not Found' })
    }
    await response.save()
    return res.status(httpStatusCodes.CREATED).json({ msg: `Edited ${name}` })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.delete_apartment = async (req, res) => {
  try {
    const { apartment_id } = req.params
    const response = await APARTMENTMODEL.findByIdAndDelete({
      _id: apartment_id,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: `Unable to remove apartment building` })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `Apartment building Deleted` })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// units
module.exports.fetch_units = async (req, res) => {
  try {
    const {apartment_id} = req.params
    let response = await APARTMENTMODEL.findById({_id:apartment_id}).populate('units')
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to fetch units' })
    }
    return res.status(httpStatusCodes.OK).json(response)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.create_apartment_unit = async (req, res) => {
  try {
    const { apartment_id } = req.params
    const { rent, unit_no } = req.body
    const details = { rent, unit_no }

    const apartment = await APARTMENTMODEL.findById({
      _id: apartment_id
    }).populate('units')
    if (!apartment) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to find apartment' })
    }
    const match_unit = apartment.units.some(item => item.unit_no === unit_no)
    if(match_unit){
      return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ error: 'Unit exists' })
    }

    let response = await UNITMODEL.create(details)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to create unit' })
    }
   
    apartment.units.push(response._id)

    await response.save()
    await apartment.save()
    return res
      .status(httpStatusCodes.CREATED)
      .json({ msg: 'Created Apartment Unit' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.edit_apartment_unit = async (req, res) => {
  try {
    const { apartment_id, unit_id } = req.params
    const { unit_no, rent } = req.body
    const details = {}

    const apartment = await APARTMENTMODEL.findById({_id:apartment_id}).populate('units')
    if (!apartment) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: `Apartment Not Found` })
    }

    details.unit_no = unit_no

    const is_unit_exist = apartment.units.some(item => item.unit_no === unit_no)
    if(is_unit_exist){
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unit Number exists' })
    }

    if (rent !== '') details.rent = rent

    const response = await UNITMODEL.findByIdAndUpdate(
      { _id: unit_id },
      details,
    )
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: `Apartment Not Found` })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `Updated ${details.unit_no}` })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.delete_apartment_unit = async (req, res) => {
  try {
    const { apartment_id, unit_id } = req.params

    const apartment_response = await APARTMENTMODEL.findById({
      _id: apartment_id,
    })
    if (!apartment_response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Apartment Not Found' })
    }
    const index = apartment_response.units.findIndex(
      (item) => item.toString() === unit_id,
    )
    if (index === -1) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to delete Unit' })
    }
    apartment_response.units.splice(index, 1)

    await apartment_response.save()

    const response = await UNITMODEL.findByIdAndDelete({ _id: unit_id })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit Not Found' })
    }

    return res.status(httpStatusCodes.OK).json({ msg: `Deleted Unit`, response})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
