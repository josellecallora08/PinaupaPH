const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const REPORTMODEL = require('../models/report')
const httpStatusCodes = require('../constants/constants')

module.exports.delayedRents = async (req, res) => {
  try {
    const { month, year } = req.query
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })
  } catch (err) {}
}

module.exports.revenueDashboard = async (req, res) => {
  try {
    const { year } = req.query
    console.log(req.query)
    let monthlyTotal = []
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })
    const monthValue = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'No payment' })
    }

    // const data = await response.reduce((acc, curr) => {
    //   return acc = acc + ((new Date(curr.datePaid).getMonth === ))
    // }, 0)
    for (const monthName of monthValue) {
      let totalAmount = 0

      for (const item of response) {
        if (item.isPaid) {
          const paidMonth = new Date(item.datePaid).getMonth()
          const paidYear = new Date(item.datePaid).getFullYear()

          if (year) {
            if (
              monthValue[paidMonth] === monthName &&
              parseInt(paidYear) === parseInt(year)
            ) {
              totalAmount += item.amount
            }
          } else {
            if (monthValue[paidMonth] === monthName) {
              totalAmount += item.amount
            }
          }
        }
      }

      monthlyTotal.push(totalAmount)
    }

    return res.status(httpStatusCodes.OK).json({ response: monthlyTotal })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.totalPaid = async (req, res) => {
  try {
    const { year } = req.query
    console.log('owekow', req.query)
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id',
    })
    console.log(response)
    const totalPayment = response
      .filter(
        (item) =>
          parseInt(new Date(item.datePaid).getFullYear()) === parseInt(year),
      )
      .reduce((acc, sum) => {
        return (acc = acc + sum.amount)
      }, 0)
    const totalBalance = response
      .filter(
        (item) =>
          parseInt(new Date(item.datePaid).getFullYear()) === parseInt(year),
      )
      .reduce((acc, sum) => {
        return (acc = acc + (sum.tenant_id?.balance || 0))
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
    const { month, year } = req.query

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
    const { month, year } = req.query

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
    const { month, year } = req.query

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
      .json({ occupied: occupiedUnits, total: units.length, percentage })
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
