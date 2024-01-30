const express = require('express')
const auth = require('../middlewares/authentication')
const router = express.Router()

const {checkUser, sendNewMessage, getMessages} = require('../controllers/rantlyControllers')


router.get('/user/:username', checkUser) //user profle
router.get('/messages/', auth, getMessages) //user messages
router.post('/message/:username', sendNewMessage) //New message



module.exports = router