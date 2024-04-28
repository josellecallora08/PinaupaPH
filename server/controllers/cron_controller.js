const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')
const pdf_template = require('../template/invoice')
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK
const pdf = require('html-pdf')
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
        const response1 = await TENANTMODEL.find().populate('user_id unit_id apartment_id')

        for (const item of response1) {
          if (!item.unit_id._id) {
            console.log('Unit not found for tenant:', item.unit_id._id)
            continue // Skip processing if unit_id not found
          }

          const due = new Date(item.monthly_due)
          // Calculate the difference in days between current date and due date
          const daysDifference = Math.floor((due - current_date) / DAY_IN_MS)

          if (daysDifference === 0) {
            // Check if the due date is today
            const ref_user = item.user_id._id.toString().slice(-3)
            const ref_unit = item.unit_id.unit_no

            const reference = `INV${day}${month}${year}${ref_unit}${ref_user}`

            const exist = await INVOICEMODEL.findOne({
              'pdf.reference': reference,
            })
            if (exist) {
              console.log('Existing invoice already:', reference)
              continue
            }

            const amount = item.unit_id.rent || 6000
            item.balance += amount
            const details = {
              pdf: {
                reference: reference,
              },
              status: false,
              tenant_id: {
                user_id: {
                  username: item?.user_id.username,
                  name: item?.user_id.name,
                  email: item?.user_id.email,
                  mobile_no: item?.user_id.mobile_no,
                },
                unit_id: {
                  unit_no: item?.unit_id.unit_no,
                  rent: item?.unit_id.rent,
                },
                apartment_id: {
                  name: item?.apartment_id.name,
                  address: item?.apartment_id.address,
                  barangay: item?.apartment_id.barangay,
                  province: item?.apartment_id.province,
                  image: {
                    apartment_image_url: item?.apartment_id.image.apartment_image_url,
                    apartment_public_id: item?.apartment_id.image.apartment_public_id
                  }
                },
                balance: item?.balance,
                monthly_due: item?.monthly_due,
              },
              createdAt: Date.now(),
            }
            console.log(details)

            const pdfBuffer = await new Promise((resolve, reject) => {
              pdf
                .create(pdf_template({ response: details }), {})
                .toBuffer((err, buffer) => {
                  if (err) reject(err)
                  else resolve(buffer)
                })
            })

            // Upload PDF to Cloudinary
            const cloudinaryResponse = await new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    resource_type: 'raw',
                    format: 'pdf', // Specify resource type as 'raw' for PDF
                    folder: 'PinaupaPH/Invoices', // Folder in Cloudinary where PDF will be stored
                    overwrite: true, // Do not overwrite if file with the same name exists
                  },
                  (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                  },
                )
                .end(pdfBuffer)
            })
            await INVOICEMODEL.create({
              tenant_id: item._id,
              'pdf.public_id': cloudinaryResponse.public_id,
              'pdf.pdf_url': cloudinaryResponse.secure_url,
              'pdf.reference': reference,
              amount,
            })
            await item.save()

            console.log(`Invoice created: ${reference}`)
          }
        }
      } catch (error) {
        console.error('Error in scheduledInvoice:', error)
      } finally {
        hasRun = false
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
