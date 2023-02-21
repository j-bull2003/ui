const express = require('express')
const router = express.Router()
const { signUp, logIn } = require('../controllers/auth')
let multer = require('multer')

let upload = multer({
    dest: 'uploads/'
})

router.post('/signUp', upload.single('file'), signUp)

router.post('/logIn', logIn)

module.exports = router