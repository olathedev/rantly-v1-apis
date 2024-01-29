const express = require('express')
const router = express.Router()

const {checkUser, sendNewMessage, getMessages} = require('../controllers/rantlyControllers')


router.get('/user/:username', checkUser) //user profle
router.post('/message/:username', sendNewMessage) //New message
router.get('/messages/', getMessages) //user messages


module.exports = router