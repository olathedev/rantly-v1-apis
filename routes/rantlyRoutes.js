const express = require('express')
const router = express.Router()

const {addNewuser, checkUser, sendNewMessage, getMessages} = require('../controllers/rantlyControllers')



router.post('/', addNewuser) //New user
// router.get('/', ) //get all users
router.get('/user/:username', checkUser) //user profle
router.patch('/')
router.post('/message/:username', sendNewMessage) //New message
router.get('/messages/:username', getMessages) //user messages


module.exports = router