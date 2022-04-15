const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/login').post(loginUser)
router.get('/me',protect,getMe)
router.route('/').post(registerUser)

module.exports = router

