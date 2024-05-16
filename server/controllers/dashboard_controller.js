const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const APARTMENTMODEL = require('../models/apartment')
const UNITMODEL = require('../models/unit')
const REPORTMODEL = require('../models/report')
const httpStatusCodes = require('../constants/constants')


module.exports.calendarFetch = async (req,res) => {
  
}

module.exports.delayedRents = async (req, res) => {
  try {
    const { year } = req.query
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })

    const delayedPayments = response.filter(
      (item) =>
        new Date(item.datePaid).getMonth() > new Date(item.due).getMonth() &&
        parseInt(new Date(item.datePaid).getFullYear()) === parseInt(year),
    ).length

    const totalofPayments = response.length
    const advancePayment = response.filter(
      (item) =>
        new Date(item.datePaid).getMonth() <
          new Date(item.tenant_id.monthly_due).getMonth() &&
        parseInt(new Date(item.datePaid).getFullYear()) === parseInt(year),
    ).length

    return res
      .status(httpStatusCodes.OK)
      .json({ delayedPayments, totalofPayments, advancePayment })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.revenueDashboard = async (req, res) => {
  try {
    const { year } = req.query
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
              totalAmount += item.payment.amountPaid
            }
          } else {
            if (monthValue[paidMonth] === monthName) {
              totalAmount += item.payment.amountPaid
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
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id',
    })
    const totalPayment = response
      .filter(
        (item) =>
          parseInt(new Date(item.datePaid).getFullYear()) === parseInt(year),
      )
      .reduce((acc, sum) => {
        return (acc = acc + sum.payment.amountPaid)
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
    const { year } = req.query
    const parsedYear = parseInt(year, 10)

    if (isNaN(parsedYear)) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid year provided' })
    }

    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id',
    })

    const tenants = await TENANTMODEL.find().populate('user_id')
    const totalTenants = tenants.length

    if (totalTenants === 0) {
      return res.status(httpStatusCodes.OK).json({
        totalGoodPayer: 0,
        percentage: 0,
        totalBadPayer: 0,
        totalPayer: 0,
        response,
      })
    }

    const totalGoodPayer = response.filter((item) => {
      const datePaid = new Date(item.datePaid)
      const dueDate = new Date(item.due)
      return datePaid.getFullYear() === parsedYear && datePaid <= dueDate
    }).length

    const totalBadPayer = response.filter((item) => {
      const datePaid = new Date(item.datePaid)
      const dueDate = new Date(item.due)
      return datePaid.getFullYear() === parsedYear && datePaid > dueDate
    }).length

    const totalPayer = totalGoodPayer + totalBadPayer
    const percentage = (totalGoodPayer / totalTenants) * 100

    return res.status(httpStatusCodes.OK).json({
      totalGoodPayer,
      percentage,
      totalBadPayer,
      totalPayer,
      // response,
    })
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
