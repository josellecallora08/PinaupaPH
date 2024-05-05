const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const REPORTMODEL = require('../models/report')
const httpStatusCodes = require('../constants/constants')
module.exports.totalPaid = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id',
    })
    const totalPayment = response.reduce((acc, sum) => {
      return (acc = acc + sum.amount)
    }, 0)
    const totalBalance = response.reduce((acc, sum) => {
      return (acc = acc + sum.tenant_id.balance)
    }, 0)
    const percentage = (totalPayment / (totalPayment + totalBalance)) * 100
    console.log(totalBalance + totalPayment)
    return res
      .status(httpStatusCodes.OK)
      .json({ percentage, totalBalance, totalPayment })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.deliquencyRate = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id',
    })
    const tenants = await TENANTMODEL.find().populate('user_id')
    const totalGoodPayer = tenants.reduce((acc, sum) => {
      return (acc = acc + (sum.balance === 0 ? 1 : 0))
    }, 0)
    console.log(tenants.length)
    // const totalDeliquency = response.reduce((acc, sum, index) => {
    //   return (acc =
    //     acc +
    //     ((sum.tenant_id.balance === 0 &&
    //       new Date(sum.datePaid).getDate() <=
    //         new Date(sum.tenant_id.monthly_due).getDate()) ||
    //     sum.tenant_id.balance === 0
    //       ? 1
    //       : 0))
    // }, 0)
    const percentage = (totalGoodPayer / tenants.length) * 100
    return res.status(httpStatusCodes.OK).json({ totalGoodPayer, percentage })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.renewalRate = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate(
      'user_id unit_id apartment_id',
    )
    const totalPayment = response.reduce((acc, sum) => {
      return (acc = acc + sum.amount)
    }, 0)
    console.log(totalPaid)
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.occupancyRate = async (req, res) => {
  try {
    const response = await APARTMENTMODEL.find().populate('units')
    const units = await UNITMODEL.find()
    let occupiedUnits = 0
    response.forEach((apartment) => {
      occupiedUnits += apartment.units.reduce((acc, unit) => {
        return acc + (unit.occupied === true ? 1 : 0)
      }, 0)
    })
    const percentage = (occupiedUnits / units.length) * 100
    console.log(occupiedUnits)
    return res
      .status(httpStatusCodes.OK)
      .json({ occupied: occupiedUnits, percentage })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.reportRate = async (req, res) => {
  try {
    const response = await REPORTMODEL.find()
    const totalReport = response.reduce((acc, sum) => {
      return (acc = acc + (sum.status === true ? 1 : 0))
    }, 0)

    const percentage = (totalReport / response.length) * 100
    return res.status(httpStatusCodes.OK).json({ totalReport, percentage })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
