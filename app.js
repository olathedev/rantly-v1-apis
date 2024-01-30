const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const routes = require('./routes/rantlyRoutes')
const cors = require('cors')
const morgan = require('morgan')
const {notFound, finalErrorHandler} = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`Rantly listening on ${process.env.PORT}`))

    }catch(error){
        console.log("error connecting", error.message)
    }
}

connect()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/rantly', routes)

app.use(notFound)
app.use(finalErrorHandler)