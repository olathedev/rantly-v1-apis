const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema;

const UserSchema = new Schema({

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
    }

}, {timestamps: true})


UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.statics.createToken = function () {
    return jwt.sign({userId: this._id}, 'testsecret', {
        expiresIn: '30d'
    })
}

module.exports = mongoose.model('user', UserSchema)