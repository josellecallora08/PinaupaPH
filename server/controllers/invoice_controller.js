const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')

let hasRun = false

module.exports.scheduledInvoice = () => {
  cron.schedule(`* * * * * *`, async () => {
    if (!hasRun) {
      hasRun = true
      let reference
      const current_date = new Date()
      const day = current_date.getDate()
      try {
        let response = await TENANTMODEL.find()
        response.forEach(async (item) => {
          const due = new Date(item.monthly_due)
          const date = due.getDate()
          let ref_user = item._id.toString().slice(-10)
          if (date === day) {
            let unit_response = await UNITMODEL.findById({ _id: item.unit_id })
            let ref_unit = unit_response._id.toString().slice(-5)
            reference = `INV-${ref_unit}${ref_user}` //add another more id that could differentiate one inv to another
            // Include condition to check whether the same invoice is existing or not
            // make sure it runs once when the day is the same even if the user reloads
            item.balance += unit_response.rent
            await item.save()
            response = await INVOICEMODEL.create({
              user_id: item._id,
              reference,
              amount: 6000,
            })
            console.log('done')
          }
        })
      } catch (error) {
        console.error('Error in scheduledInvoice:', error)
      }
    }
  })
}
