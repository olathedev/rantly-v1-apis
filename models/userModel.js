const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userModel = new Schema({

    firstname: {
        type: String,
        required: [true, "firstname is required"],
        lowerCase: true,
        minLenght: 2,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
        lowerCase: true,
        minLenght: 2,
        maxLength: 50
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
        maxLength: 20
    }

}, {timestamps: true})

module.exports = mongoose.model('user', userModel)