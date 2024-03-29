const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const PAYMENTMODEL = require('../models/payment')
const httpStatusCodes = require('../constants/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const createToken = ({ id, username, role }) => {
  return jwt.sign({ id, username, role }, process.env.SECRET, {
    expiresIn: '3d',
  })
}
// ? Done Testing API
module.exports.sign_up = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    mobile_no,
    birthday,
    unit_id,
    deposit,
  } = req.body
  const details = {}
  if (name !== '') details.name = name
  if (username !== '') details.username = username
  if (email !== '') details.email = email
  if (password !== '') {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    if (!hashed)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Error hashing the password.' })

    details.password = hashed
  }
  if (mobile_no !== '') details.mobile_no = mobile_no
  if (birthday !== '') details.birthday = birthday

  try {
    if (await USERMODEL.findOne({ username }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Username already exists' })
    if (await USERMODEL.findOne({ email }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Email already exists' })
    if (await USERMODEL.findOne({ mobile_no }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Mobile Number already exists.' })

    const unit_status = await UNITMODEL.findById({ _id: unit_id })
    if (unit_status.occupied === true)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unit is Occupied.' })

    let response = await USERMODEL.create(details)
    console.log(response)
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unsuccessful registration. Please try again later.' })

    const imageUpload = await cloudinary.uploader.upload(
      `./template/profile-default.svg`,
      {
        quality: 'auto:low',
        folder: 'PinaupaPH/Profile',
        resource_type: 'auto',
      },
    )

    if (!imageUpload || !imageUpload.secure_url) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to upload profile.' })
    }

    response.profile_image.image_url = imageUpload.secure_url
    response.profile_image.public_id = imageUpload.public_id

    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.create({
        user_id: response._id,
        unit_id: unit_id,
        deposit,
      })
      if (!tenant)
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: 'Failed to create Tenant Data. Please try again later.',
        })
    }

    await response.save()
    const unit = await UNITMODEL.findByIdAndUpdate(
      { _id: unit_id },
      { occupied: true },
    )
    if (!unit)
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: 'Failed to update occupancy status at Unit Collection.',
      })

    // const token = createToken(response._id, response.username, response.role)
    // res.cookie('token', token, { maxAge: 900000 })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Created Account successfully!', response })
  } catch (err) {
    console.error({ error: err })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
// ? Done Testing API
module.exports.sign_in = async (req, res) => {
  const { username, password } = req.body
  try {
    let response = await USERMODEL.findOne({ username })
    if (!response) {
      response = await USERMODEL.findOne({ email: username })
      if (!response)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid Credentials (temp - Username)' })
    }

    const match = await bcrypt.compare(password, response.password)
    if (!match)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid Credentials (tewmp - Password)' })

    const token = createToken(response._id, response.username, response.role)

    res.cookie('token', token, { maxAge: 900000 })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Login Successfully!', response, token })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
module.exports.search_user = async (req, res) => {
  try {
    const { filter } = req.params
    let search = await TENANTMODEL.aggregate([
      {
        $lookup: {
          from: 'units',
          localField: 'unit_id',
          foreignField: '_id',
          as: 'unit',
        },
      },
      {
        $unwind: {
          path: '$unit',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { 'unit.unit_no': filter },
            { 'user.name': { $regex: filter, $options: 'i' } },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])

    if (!search || search.length <= 0) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ msg: 'No matching records..' })
    }

    search = search.map((item) => ({
      _id: item._id,
      // image: item.user[0].profile_image,
      name: item.user.name,
      monthly_due: new Date(item.monthly_due).toDateString(),
      unit_no: item.unit.unit_no,
    }))

    return res.status(httpStatusCodes.FOUND).json(search)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// ? Tested API
module.exports.fetch_users = async (req, res) => {
  let user = await TENANTMODEL.find()
    .populate({
      path: 'user_id',
      model: USERMODEL,
      select: 'name username email birthday mobile_no role',
    })
    .populate({
      path: 'unit_id',
      model: UNITMODEL,
      select: 'unit_no rent',
    })
    .select('-payment -household -pet -createdAt -updatedAt')

  try {
    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    user = user.map((item) => ({
      _id: item._id,
      // image: item.user_id.profile_image,
      name: item.user_id.name,
      username: item.user_id.username,
      email: item.user_id.email,
      birthday: item.user_id.birthday,
      phone: item.user_id.mobile_no,
      role: item.user_id.role,
      unit_id: item.unit_id._id,
      unit_no: item.unit_id.unit_no,
      rent: item.unit_id.rent,
      deposit: item.deposit,
      advance: item.advance,
      balance: item.balance,
      monthly_due: new Date(item.monthly_due).toDateString(),
    }))

    return res.status(httpStatusCodes.OK).json(user)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// ? Tested API
module.exports.fetch_user = async (req, res) => {
  const { user_id } = req.params
  let user = await TENANTMODEL.findOne({ user_id: user_id })
    .populate({
      path: 'user_id',
      model: USERMODEL,
      select: 'name username',
    })
    .populate({
      path: 'unit_id',
      model: UNITMODEL,
      select: 'unit_no rent',
    })
    .select('-payment -household -pet -createdAt -updatedAt')

  try {
    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    user = {
      // image: user.user_id.profile_image,
      name: user.user_id.name,
      username: user.user_id.username,
      unit_no: user.unit_id.unit_no,
      rent: user.unit_id.rent,
      deposit: user.deposit,
      advance: user.advance,
      balance: user.balance,
      monthly_due: user.monthly_due,
    }

    return res.status(httpStatusCodes.OK).json(user)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// ? Done checking on POSTMAN API
module.exports.update_profile = async (req, res) => {
  const { user_id } = req.params
  const {
    name,
    username,
    email,
    new_password,
    password,
    mobile_no,
    birthday,
    unit_id,
    deposit,
  } = req.body
  const salt = await bcrypt.genSalt(10)
  const details = {}
  if (name !== '') details.name = name
  if (username !== '') details.username = username
  if (email !== '') details.email = email
  if (mobile_no !== '') details.mobile_no = mobile_no
  if (birthday !== '') details.birthday = birthday
  try {
    let response = await USERMODEL.findByIdAndUpdate(
      { _id: user_id },
      details,
    ).select('name username password email phone birthday role')
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to update information(2)' })

    if (password && new_password) {
      if (bcrypt.compareSync(password, response.password)) {
        const hashed = await bcrypt.hash(new_password, salt)
        if (!hashed)
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Error hashing the password.' })

        response.password = hashed
      }
    }

    await response.save()

    return res
      .status(httpStatusCodes.CREATED)
      .json({ msg: 'Information Updated Successfully!', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// Change Profile Picture
module.exports.update_profile_picture = async (req, res) => {
  try {
    const { user_id, public_id } = req.params
    const profile_image = req.file
    // console.log(profile_image)
    const b64 = Buffer.from(profile_image.buffer).toString('base64')
    let dataURI = 'data:' + profile_image.mimetype + ';base64,' + b64
    console.log(`dataURI: ${dataURI}`)
    uploadedImage = await cloudinary.uploader.upload(dataURI, {
      public_id: public_id,
      overwrite: true,
      quality: 'auto:low',
      resource_type: 'auto',
      folder: 'PinaupaPH/Profile',
    })

    console.log(uploadedImage)

    if (!uploadedImage || !uploadedImage.secure_url) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to upload profile.' })
    }
    const url = uploadedImage.secure_url
    const response = await USERMODEL.findByIdAndUpdate(
      { _id: user_id },
      {
        profile_image: {
          image_url: url,
          public_id: public_id,
        },
      },
    )
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to change image' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Profile has been changed' })
  } catch (err) {
    console.error({ err })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
//  ? Tested API
module.exports.delete_tenant = async (req, res) => {
  try {
    const { user_id } = req.params
    const response = await USERMODEL.findByIdAndDelete({ _id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found...' })
    }
    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.findOneAndDelete({ user_id: user_id })
      if (!tenant)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to Locate Tenant' })

      const pet = await TENANTMODEL.findOneAndDelete({})

      const unit = await UNITMODEL.findByIdAndUpdate(
        { _id: tenant.unit_id },
        { occupied: false },
      )

      if (!unit)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to locate Unit' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Removed Successfully...', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
