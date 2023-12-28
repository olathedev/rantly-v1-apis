const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes/rantlyRoutes')


const app = express()

app.use(express.json())


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`Rantly listening on ${process.env.PORT}`))

    }catch(error){
        console.log("error connecting", error.message)
    }
}

connect()

app.use('/api/v1/rantly', routes)

app.use((req, res) => {
    res.status(404).json("The endpoint you requested does not exist")
})