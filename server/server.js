const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

// import routes
const user_route = require('./routes/user')

const app = express()
app.use(express.json())
app.use(cors())

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