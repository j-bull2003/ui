const express = require('express')
const { addPhoto, deletePhoto, addTask, updateTask } = require('../controllers/post')
const router = express.Router()
let multer = require('multer')

let upload = multer({
    dest: 'uploads/'
})

router.post('/add-photo', upload.single('file'), addPhoto)

router.post('/delete-photo', deletePhoto)

router.post('/add-task', addTask)

router.post('/update-task', updateTask)

module.exports = router