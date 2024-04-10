const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')

const DAY_IN_MS = 24 * 60 * 60 * 1000 // Number of milliseconds in a day

module.exports.scheduledInvoice = () => {
  let hasRun = false // Initialize hasRun flag

  cron.schedule('* * * * *', async () => {
    // Run every minute, adjust as needed
    if (!hasRun) {
      hasRun = true

      const current_date = new Date()
      const day = current_date.getDate()
      const month = current_date.getMonth()
      const year = current_date.getFullYear() // Use getFullYear() instead of getYear()

      try {
        const response = await TENANTMODEL.find()

        for (const item of response) {
          if (!item.unit_id) {
            console.log('Unit not found for tenant:', item._id)
            continue // Skip processing if unit_id not found
          }

          const due = new Date(item.monthly_due)
          const dueDay = due.getDate()

          // Calculate the difference in days between current date and due date
          const daysDifference = Math.floor((due - current_date) / DAY_IN_MS)

          if (daysDifference === 0) {
            // Check if the due date is today
            const unit_response = await UNITMODEL.findById(item.unit_id)
            if (!unit_response) {
              console.log('Unit not found for tenant:', item._id)
              continue // Skip processing if unit not found
            }

            const ref_user = item.user_id.toString().slice(-3)
            const ref_unit = unit_response._id.toString()

            const reference = `INV-${day}${month}${year}${ref_unit}${ref_user}`

            const exist = await INVOICEMODEL.findOne({ reference: reference })
            if (exist) {
              console.log('Existing invoice already:', reference)
              continue // Skip creating invoice if already exists
            }

            // Adjust amount based on unit rent or any other relevant logic
            const amount = unit_response.rent || 6000

            item.balance += amount
            await item.save()

            await INVOICEMODEL.create({
              user_id: item.user_id,
              reference,
              amount,
            })

            console.log(`Invoice created: ${reference}`)
          }
        }
      } catch (error) {
        console.error('Error in scheduledInvoice:', error)
      } finally {
        hasRun = false // Reset hasRun flag
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
