const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageModel = new Schema({

    message: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        default: "anonymous"
    },
    userId: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('message', messageModel)