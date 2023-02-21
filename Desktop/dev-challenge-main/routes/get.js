const express = require('express')
const { getPhotos, getTask, getLatestNews, getClothesData } = require('../controllers/get')
const router = express.Router()

router.get('/get-photos/:id', getPhotos)

router.get('/get-tasks/:id', getTask)

router.get('/get-latest-news', getLatestNews)

router.get('/get-clothes-data', getClothesData)

module.exports = router