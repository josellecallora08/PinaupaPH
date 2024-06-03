const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const nodemailer = require('nodemailer')
const axios = require('axios')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')
const pdf_template = require('../template/invoice')
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK
const pdf = require('html-pdf')
const DAY_IN_MS = 24 * 60 * 60 * 1000 // Number of milliseconds in a day
const ejs = require('ejs');
const path = require('path');

module.exports.scheduledInvoice = () => {
  let hasRun = false; // Initialize hasRun flag

  cron.schedule('0 0 * * * *', async () => {
    // Run every hour, adjust as needed
    if (!hasRun) {
      hasRun = true;

      const current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      const day = current_date.getDate();
      const month = current_date.getMonth() + 1; // Corrected to get the actual month
      const year = current_date.getFullYear();

      try {
        const tenants = await TENANTMODEL.find().populate('user_id unit_id apartment_id');

        for (const tenant of tenants) {
          if (!tenant.unit_id._id) {
            console.log('Unit not found for tenant:', tenant.unit_id._id);
            continue; // Skip processing if unit_id not found
          }

          const due = new Date(tenant.monthly_due);
          due.setFullYear(current_date.getFullYear(), current_date.getMonth(), due.getDate());
          due.setHours(0, 0, 0, 0);
          // Calculate the difference in days between current date and due date
          const daysDifference = Math.floor((due - current_date) / (1000 * 60 * 60 * 24));

          if (daysDifference === 7 && !tenant.user_id.isDelete) {
            const ref_user = tenant.user_id._id.toString().slice(-3);
            const ref_unit = tenant.unit_id.unit_no;
            const reference = `INV${day}${month}${year}${ref_unit}${ref_user}`;

            const exist = await INVOICEMODEL.findOne({
              'pdf.reference': reference,
            });
            if (exist) {
              console.log('Existing invoice already:', reference);
              continue;
            }

            const amount = tenant.unit_id.rent || 6000;
            tenant.balance += amount;
            const details = {
              pdf: {
                reference: reference,
              },
              status: false,
              tenant_id: {
                user_id: {
                  username: tenant.user_id.username,
                  name: tenant.user_id.name,
                  email: tenant.user_id.email,
                  mobile_no: tenant.user_id.mobile_no,
                },
                unit_id: {
                  unit_no: tenant.unit_id.unit_no,
                  rent: tenant.unit_id.rent,
                },
                apartment_id: {
                  name: tenant.apartment_id.name,
                  address: tenant.apartment_id.address,
                  barangay: tenant.apartment_id.barangay,
                  province: tenant.apartment_id.province,
                  image: {
                    apartment_image_url: tenant.apartment_id.image.apartment_image_url,
                    apartment_public_id: tenant.apartment_id.image.apartment_public_id,
                  },
                },
                balance: tenant.balance,
                monthly_due: tenant.monthly_due,
              },
              createdAt: Date.now(),
            };

            const templatePath = path.join(__dirname, '../template', 'invoice_report_template.ejs');
            const htmlContent = await ejs.renderFile(templatePath, {
              response: details,
            });

            const pdfBuffer = await new Promise((resolve, reject) => {
              pdf
                .create(htmlContent, {
                  childProcessOptions: {
                    env: {
                      OPENSSL_CONF: '/dev/null',
                    },
                  },
                })
                .toBuffer((err, buffer) => {
                  if (err) reject(err);
                  else resolve(buffer);
                });
            });

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
                    if (error) reject(error);
                    else resolve(result);
                  },
                )
                .end(pdfBuffer);
            });

            const dateDue = new Date(tenant.monthly_due).getDate();
            const dueMonth = new Date().setDate(dateDue);
            const response = await INVOICEMODEL.create({
              tenant_id: tenant._id,
              'pdf.public_id': cloudinaryResponse.public_id,
              'pdf.pdf_url': cloudinaryResponse.secure_url,
              'pdf.reference': reference,
              due: new Date(dueMonth).toISOString(),
              amount,
            });

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
              },
            });

            // Function to download the PDF from Cloudinary
            const downloadPdfFromCloudinary = async () => {
              const response = await axios.get(cloudinaryResponse.secure_url, {
                responseType: 'stream',
              });
              return response.data;
            };

            // Define the email options
            const mailOptions = {
              from: 'pinaupaph@gmail.com',
              to: tenant.user_id.email,
              subject: `Urgent: Your Invoice for ${tenant.unit_id.unit_no} is Due Soon!`,
              html: `
                <html>
                <body>
                  <p>Dear ${tenant.user_id.name},</p>
                  <p>I hope this email finds you well.</p>
                  <p>This is to inform you that an invoice has been sent your way for your <strong>Unit ${tenant.unit_id.unit_no}</strong>.</p>
                  <p>Here's what you need to know:</p>
                  <ul>
                    <li>Invoice Number: <strong>${reference}</strong></li>
                    <li>Invoice Date: <strong>${new Date(response.createdAt).toDateString()}</strong></li>
                    <li>Due Date: <strong>${new Date(tenant.monthly_due).toDateString()}</strong></li>
                    <li>Total Amount: <strong>${(response.amount).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
                    <li>Previous Balance: <strong>${(tenant.balance - response.amount).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
                  </ul>
                  <p>Attached to this email, you will find the invoice file for your reference and records.</p>
                  <p>If you have any questions or concerns regarding this invoice, please feel free to reach out to me.</p>
                  <p>Thank you for your prompt attention to this matter.</p>
                  <p>Best regards,</p>
                  <strong>Wendell C. Ibias</strong><br/>
                  <strong>Apartment Owner</strong><br/>
                  <strong>09993541054</strong><br/>
                </body>
                </html>`,
              attachments: [
                {
                  filename: 'invoice.pdf',
                  content: await downloadPdfFromCloudinary(),
                },
              ],
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('Error:', error);
              } else {
                console.log('Email sent:', info.response);
              }
            });

            await tenant.save();
          }
        }
      } catch (error) {
        console.error('Error in scheduledInvoice:', error);
      } finally {
        hasRun = false;
      }
    }
  });
};


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


module.exports.scheduledOverdueReminder = () => {
  cron.schedule('* * * * *', async () => {
    // Run daily ast midnight
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    try {
      const tenants = await TENANTMODEL.find().populate('user_id unit_id apartment_id');

      for (const tenant of tenants) {
        if (!tenant.unit_id._id || tenant.user_id.isDelete) {
          continue; // Skip processing if unit_id not found or user is deleted
        }
        console.log("proceed")
        const dueDate = new Date(tenant.monthly_due);
        dueDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), dueDate.getDate());
        dueDate.setHours(0, 0, 0, 0);

        if (currentDate > dueDate) {
          const invoices = await INVOICEMODEL.find({
            tenant_id: tenant._id,
            due: { $lte: currentDate },
            isPaid: false, // Unpaid invoices
          });
          console.log(invoices)

          if (invoices.length > 0) {
            const latestInvoice = invoices[0]; // Assuming the latest unpaid invoice
            console.log("proceed3")

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
              },
            }); 
            console.log("s")
            const mailOptions = {
              from: 'pinaupaph@gmail.com',
              to: tenant.user_id.email,
              subject: `Urgent: Payment Overdue for Unit ${tenant.unit_id.unit_no}`,
              html: `
                <html>
                <body>
                  <p>Dear ${tenant.user_id.name},</p>
                  <p>This is a reminder that your payment for <strong>Unit ${tenant.unit_id.unit_no}</strong> is overdue.</p>
                  <p>Details of the overdue invoice:</p>
                  <ul>
                    <li>Invoice Number: <strong>${latestInvoice.pdf.reference}</strong></li>
                    <li>Invoice Date: <strong>${new Date(latestInvoice.createdAt).toDateString()}</strong></li>
                    <li>Due Date: <strong>${new Date(latestInvoice.due).toDateString()}</strong></li>
                    <li>Total Amount: <strong>${(latestInvoice.amount).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
                  </ul>
                  <p>Please make the payment at your earliest convenience to avoid any late fees or disruption of services.</p>
                  <p>If you have already made the payment, kindly ignore this reminder.</p>
                  <p>Thank you for your prompt attention to this matter.</p>
                  <p>Best regards,</p>
                  <strong>Wendell C. Ibias</strong><br/>
                  <strong>Apartment Owner</strong><br/>
                  <strong>09993541054</strong><br/>
                </body>
                </html>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('Error:', error);
              } else {
                console.log('Overdue reminder email sent:', info.response);
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in scheduledOverdueReminder:', error);
    }
  });
};
