const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const CCTVMODEL = require('../models/cctv')
const httpStatusCodes = require('../constants/constants')
const cloudinary = require('cloudinary').v2
// ? Tested API
module.exports.fetch_apartments = async (req, res) => {
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
// ? Tested API
module.exports.fetch_apartment = async(req, res) => {
  try{
    const {apartment_id} = req.params
    const response = await APARTMENTMODEL.findById({_id:apartment_id})
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to fetch apartment' })
    }
    return res.status(httpStatusCodes.OK).json(response)
  }catch(err){
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// ? Tested API
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

    const imageUpload = await cloudinary.uploader.upload(`./template/apartment-default.svg`,{
      quality: 'auto:low',
      folder:'PinaupaPH/Apartment',
      resource_type: 'auto',
    })
     
    if(!imageUpload || !imageUpload.secure_url){
      return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to upload profile."})
    }

    response.image.apartment_image_url = imageUpload.secure_url
    response.image.apartment_public_id = imageUpload.public_id

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

module.exports.change_apartment_image = async (req, res) => {
  try{
    const {apartment_id, apartment_public_id} = req.params
    const apartment_image = req.file
    const b64 = Buffer.from(profile_image.buffer).toString('base64')
    let dataURI = `data:${apartment_image.mimetype};base64,${b64}`

    console.log(`dataURI: ${dataURI}`)
      uploadedImage = await cloudinary.uploader.upload(dataURI, {
        public_id: apartment_public_id,
        overwrite: true,
        quality: 'auto:low',
        resource_type: 'auto',
        folder: 'PinaupaPH/Apartment',
      });
  
    console.log(uploadedImage)
    
    if(!uploadedImage || !uploadedImage.secure_url){
      return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to upload profile."})
    }
    const url = uploadedImage.secure_url
    const response = await APARTMENTMODEL.findByIdAndUpdate({_id: apartment_id}, {
      profile_image: {
        apartment_image_url: url,
        apartment_public_id: apartment_public_id,
      },
    });
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to change image' })
    }

    return res
    .status(httpStatusCodes.OK)
    .json({ msg: 'Apartment Image has been changed' })
  }catch(err){
    console.error({ err })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}

// ? Tested API
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
// ? Tested API
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
    const cctv = response.cctvs.map(async(item) => {
      await CCTVMODEL.findByIdAndDelete({_id: item})
    })
    const units = response.units.map(async(item) => {
      await UNITMODEL.findByIdAndDelete({_id: item})
    })

    await Promise.all([...cctv, ...units]);
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `Apartment building Deleted`, cctv, units})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// ? Tested API
module.exports.fetch_unit = async(req, res) => {
  try{
    const {apartment_id, unit_id} = req.params
    let response = await APARTMENTMODEL.findById({ _id: apartment_id })
    .populate({
      path: 'units',
      model: UNITMODEL,
      select: 'rent unit_no',
      options: { sort: { unit_no: 1 } },
    })
    .select('units')
  if (!response) {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ error: 'Unable to fetch units' })
  }
  const unit = response.units.filter(item => item._id.toString() === unit_id)
  return res.status(httpStatusCodes.OK).json(unit)
  }catch(err){
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// ? Tested API
module.exports.fetch_unit_apartment = async(req, res)=> {
  const { apartment_id } = req.params
  let response = await APARTMENTMODEL.findById({ _id: apartment_id })
    .populate({
      path: 'units',
      model: UNITMODEL,
      select: 'rent unit_no',
      options: { sort: { unit_no: 1 } },
    })
    .select('name units')
  if (!response) {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ error: 'Unable to fetch units' })
  }
  return res.status(httpStatusCodes.OK).json(response)
}

// ? Tested API
module.exports.fetch_units = async (req, res) => {
  try {
    let response = await UNITMODEL.find()
  
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

// ? Tested API
module.exports.create_apartment_unit = async (req, res) => {
  try {
    const { apartment_id } = req.params
    const { rent, unit_no } = req.body
    const details = { rent, unit_no }

    const apartment = await APARTMENTMODEL.findById({
      _id: apartment_id,
    })
      .populate({
        path: 'units',
        model: UNITMODEL,
        select: 'rent unit_no ',
      })
      .select('units')
    if (!apartment) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to find apartment' })
    }
    const match_unit = apartment.units.some((item) => item.unit_no === unit_no)
    if (match_unit) {
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

// ? Tested API
module.exports.edit_apartment_unit = async (req, res) => {
  try {
    const { apartment_id, unit_id } = req.params
    const { unit_no, rent } = req.body
    const details = {}

    const apartment = await APARTMENTMODEL.findById({ _id: apartment_id })
      .populate({
        path: 'units',
        model: UNITMODEL,
        select: 'rent unit_no ',
      })
      .select('units')
    if (!apartment) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: `Apartment Not Found` })
    }

    details.unit_no = unit_no

    const is_unit_exist = apartment.units.some(
      (item) => item.unit_no === unit_no,
    )
    if (is_unit_exist) {
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

// ? Tested API
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

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `Deleted Unit`, response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
