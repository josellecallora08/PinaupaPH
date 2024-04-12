const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const body_parser = require('body-parser')
const cron = require('node-cron')
require('dotenv').config()

// import routes
const user_route = require('./routes/user')
const cctv_route = require('./routes/cctv')
const report_route = require('./routes/report')
const apartment_route = require('./routes/apartment')
const document_route = require('./routes/document')
const invoice_route = require('./routes/invoice')
const payment_route = require('./routes/payment')

const {
  scheduledInvoice,
  deleteOTP,
} = require('./controllers/invoice_controller')

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Cross-Origin Resource Sharing (CORS) middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization, x-auth-token',
  }),
)

// Middleware to parse URL-encoded bodies
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  // Start server after successful MongoDB connection
  app.listen(process.env.PORT, () => {
    console.log(`Connected to DB and Listening to PORT: ${process.env.PORT}`)
  })
})

// Delete One-Time Passwords (OTPs)
deleteOTP()

// Schedule Monthly Invoice Creation
scheduledInvoice()

// Routes
app.use('/api/user', user_route)
app.use('/api/cctv', cctv_route)
app.use('/api/report', report_route)
app.use('/api/apartment', apartment_route)
app.use('/api/documents', document_route)
app.use('/api/invoice', invoice_route)
app.use('/api/payment', payment_route)

// Default route
app.get('/', (req, res) => {
  res.json('PinaupaPH Backend')
})

module.exports = app
