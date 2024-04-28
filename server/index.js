const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const body_parser = require('body-parser')
require('dotenv').config()
const http = require('http')
const Server = require('socket.io').Server
const Socket = require('socket.io').Socket

// import routes
const user_route = require('./routes/user')
const cctv_route = require('./routes/cctv')
const report_route = require('./routes/report')
const apartment_route = require('./routes/apartment')
const document_route = require('./routes/document')
const invoice_route = require('./routes/invoice')
const payment_route = require('./routes/payment')
const announcement_route = require('./routes/announcement')

const { scheduledInvoice, deleteOTP } = require('./controllers/cron_controller')

const app = express()
// Middleware to parse JSON bodies
app.use(express.json())

// Cross-Origin Resource Sharing (CORS) middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
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
const server = http.createServer(app)
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ['http://localhost:5173', process.env.CLIENT_URL],
  },
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Start server after successful MongoDB connection
    io.on('connection', (socket) => {
      console.log('Connected to Socket.io')

      socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
      })
      socket.on('disconnect', () => {
        console.log('Disconnected')
      })

      socket.on('send-comment', () => {
        io.emit('receive-comment')
        io.emit('receive-comment-notification')
      })

      socket.on('send-payment', () => {
        io.emit('receive-payment')
        io.emit('receive-payment-notification')
      })

      socket.on('send-announcement', () => {
        io.emit('receive-announcement')
        io.emit('receive-announcement-notification')
      })
    })
    server.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening to PORT: ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
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
app.use('/api/document', document_route)
app.use('/api/invoice', invoice_route)
app.use('/api/payment', payment_route)
app.use('/api/announcement', payment_route)

// Default route
app.get('/', (req, res) => {
  res.json('PinaupaPH Backend')
})

module.exports = app
