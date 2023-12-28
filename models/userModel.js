const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userModel = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }

}, {timestamps: true})

module.exports = mongoose.model('user', userModel)