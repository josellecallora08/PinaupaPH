const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const httpStatusCodes = require('../constants/constants')
const cloudinary = require('cloudinary').v2
const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path')

module.exports.generate_previous_tenants = async (req, res) => {
  try {
    const { unit_id } = req.query
    const response = await UNITMODEL.findById(unit_id).populate({
      path: 'tenants.tenant_id',
      populate: 'user_id',
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to view previous tenants.' })
    }
    const previousTenants = response.tenants
      .filter((tenant) => tenant.moveOut) // Only include tenants who have moved out
      .map((tenant) => {
        const moveInDate = new Date(tenant.moveIn)
        const moveOutDate = new Date(tenant.moveOut)
        const stayDuration = Math.round(
          (moveOutDate - moveInDate) / (1000 * 60 * 60 * 24),
        ) // Duration in days
        return {
          ...tenant._doc,
          stayDuration,
          tenantName: tenant.tenant_id.user_id.name, // Assuming this field exists
        }
      })

    const totalTenants = previousTenants.length
    const unitNo = response.unit_no
    const generationDate = new Date().toLocaleDateString()
    const templatePath = path.join(
      __dirname,
      '../template',
      'previous_tenants_template.ejs',
    )
    const htmlContent = await ejs.renderFile(templatePath, {
      previousTenants,
      totalTenants,
      unitNo,
      generationDate,
    })
    pdf
      .create(htmlContent, {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null',
          },
        },
      })
      .toBuffer((err, buffer) => {
        if (err) {
          console.log(err.message)
          return res
            .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: err.message })
        }
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=previous_tenants_report.pdf',
        )
        res.send(buffer)
      })

    // return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetch_previous_tenants = async (req, res) => {
  try {
    const { unit_id } = req.query
    const response = await UNITMODEL.findById(unit_id).populate({
      path: 'tenants.tenant_id',
      populate: 'user_id',
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to view previous tenants.' })
    }
    const previousTenants = response.tenants.filter((tenant) => tenant.moveOut) // Only include tenants who have moved out

    return res.status(httpStatusCodes.OK).json({ response: previousTenants })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetch_unit = async (req, res) => {
  try {
    const { apartment_id, unit_id } = req.params
    let response = await APARTMENTMODEL.findById({ _id: apartment_id })
      .populate({
        path: 'units',
        model: UNITMODEL,
        select: 'rent unit_no occupied tenants',
        options: { sort: { unit_no: 1 } },
        populate: {
          path: 'tenants.tenant_id',
          populate: {
            path: 'user_id',
          },
        },
      })
      .select('units')
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to fetch units' })
    }
    const unit = response.units.filter(
      (item) => item._id.toString() === unit_id,
    )
    return res.status(httpStatusCodes.OK).json({ response: unit[0] })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetch_unit_apartment = async (req, res) => {
  try {
    const { apartment_id } = req.params
    let response = await APARTMENTMODEL.findById({ _id: apartment_id })
      .populate({
        path: 'units',
        model: UNITMODEL,
        select: 'rent unit_no occupied tenants',
        options: { sort: { unit_no: 1 } },
        populate: {
          path: 'tenants.tenant_id',
          populate: {
            path: 'user_id',
          },
        },
      })
      .select('units')

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
      .json({ error: err.message })
  }
}

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
      .json({ error: err.message })
  }
}

// ? Tested API
module.exports.create_apartment_unit = async (req, res) => {
  try {
    const { apartment_id } = req.params
    const { rent, unit_no } = req.body
    const details = { rent, unit_no }
    console.log(req.body)
    const apartment = await APARTMENTMODEL.findById(apartment_id)
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
        .json({ error: 'Apartment Unit exists' })
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
      .json({ msg: 'Created Apartment Unit', response }) //updated today 5-14
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
    let unitExist
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
    const unit = apartment.units.find(
      (item) => item._id.toString() === unit_id.toString(),
    )
    if (unit.unit_no !== unit_no) {
      unitExist = apartment.units.some((item) => item.unit_no === unit_no)
      if (unitExist) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unit Number exists' })
      }
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
      .json({ msg: `Updated ${details.unit_no}`, response })
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
    const { apartment_id } = req.params
    const { unit_id } = req.query
    const unit = await UNITMODEL.findById(unit_id)
    if (!unit) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Apartment Not Found' })
    }

    if (unit.occupied) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Cannot delete occupied apartment unit' })
    }
    const apartment_response = await APARTMENTMODEL.findById(apartment_id)
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
      .json({ msg: `Apartment Unit has been deleted`, response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
