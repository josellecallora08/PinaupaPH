const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB and Listening to PORT: ${process.env.PORT}`)
    })
})
