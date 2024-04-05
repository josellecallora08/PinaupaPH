const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')
let hasRun = false

module.exports.scheduledInvoice = () => {
  cron.schedule(`* * * * * *`, async () => {
    if (!hasRun) {
      hasRun = true
      let reference
      const current_date = new Date()
      const day = current_date.getDate()
      const month = current_date.getMonth()
      const year = current_date.getYear()
      try {
        let response = await TENANTMODEL.find()
        response.forEach(async (item) => {
          const due = new Date(item.monthly_due)
          const date = due.getDate()
          let ref_user = item.user_id.toString().slice(-3)
          if (date === day) {
            let unit_response = await UNITMODEL.findById({ _id: item.unit_id })
            let ref_unit = unit_response._id.toString()
            reference = `INV-${day}${month}${year}${ref_unit}${ref_user}` //add another more id that could differentiate one inv to another
            // Include condition to check whether the same invoice is existing or not
            // make sure it runs once when the day is the same even if the user reloads
            const exist = await INVOICEMODEL.findOne({ reference: reference })
            if (exist) {
              // res.status(httpStatusCodes.BAD_REQUEST).json({error: "Invoice already created"})
              return console.log('Existing already')
            }

            item.balance += unit_response.rent
            await item.save()
            response = await INVOICEMODEL.create({
              user_id: item.user_id,
              reference,
              amount: 6000,
            })
            console.log(`Invoice created...`)
          }
        })
      } catch (error) {
        console.error('Error in scheduledInvoice:', error)
      }
    }
  })
}

module.exports.deleteOTP = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const deleteOTP = await OTPMODEL.deleteMany({
        expiry: { $lte: new Date() },
      })
      if (!deleteOTP) console.log('Unable to delete OTPs')

      const response = await OTPMODEL.find()
      response.forEach(async (item) => {
        const currentTimeAttempts = new Date()
        let refreshTimeAttempts = new Date(item.updatedAt)
        refreshTimeAttempts.setMinutes(refreshTimeAttempts.getMinutes() + 5)

        if (currentTimeAttempts >= refreshTimeAttempts) {
          await OTPMODEL.updateOne({ _id: item._id }, { attempts: 5 })
        }
      })

      console.log('Expired OTPs deleted successfully.')
    } catch (err) {
      console.error('Error deleting expired OTPs:', err)
    }
  })
}
