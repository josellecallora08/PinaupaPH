const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const body_parser = require('body-parser')
require('dotenv').config()
// import routes
const user_route = require('./routes/user')
const cctv_route = require('./routes/cctv')
// const report_route = require('./routes/report')
const apartment_route = require('./routes/apartment')
// const document_route = require('./routes/document')
// const payment_route = require('./routes/payment')

const app = express()
app.use(express.json())
app.use(cors())
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())
// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
  
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})
// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB and Listening to PORT: ${process.env.PORT}`)
    })
})

app.use('/api/user', user_route)
app.use('/api/cctv', cctv_route)
// app.use('/api/report', report_route)
app.use('/api/apartment', apartment_route)
// app.use('/api/documents', document_route)
// app.use('/api/payment', payment_route)