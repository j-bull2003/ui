const { User, Photo, Task } = require('../model')
const Parser = require('rss-parser')
const axios = require('axios').default
const fs = require("fs")
const { parse } = require("csv-parse")
const csvParser = require("csv-parser");
const needle = require("needle");
const Papa = require("papaparse")
const getUser = (req, res) => {
    try {
        const { params } = req
        const { id } = params

        User.findById({ _id: id }, { password: 0 }, async (err, user) => {
            if (!user) {
                return res.send({ success: false, message: 'No User Found' })
            }

            return res.send({ success: true, user })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const getPhotos = (req, res) => {
    try {
        const { params } = req
        const { id } = params

        Photo.find({ userId: id, isDeleted: false }, async (err, data) => {
            if (!data) {
                return res.send({ success: false, message: 'No data Found' })
            }

            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const getTask = (req, res) => {
    try {
        const { params } = req
        const { id } = params

        Task.find({ userId: id, isDeleted: false }, async (err, data) => {
            if (!data) {
                return res.send({ success: false, message: 'No data Found' })
            }

            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const getLatestNews = async (req, res) => {
    try {
        let parser = new Parser()

        let feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml')

        return res.send({ success: true, data: feed?.items[0] })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const getClothesData = async (req, res) => {
    try {

        let data = await axios.get('https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapni')
        let names = data?.data?.payload

        let resultNormailized = [
            ...names?.reduce((mp, o) => {
                if (!mp.has(o?.clothe)) {
                    mp?.set(o?.clothe, { ...o, count: 0 })
                }
                mp.get(o?.clothe).count++
                return mp
            }, new Map())
                .values(),
        ]
        return res.send({ success: true, data: data?.data, resultNormailized: resultNormailized, totalLength: names?.length })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

module.exports = {
    getUser,
    getPhotos,
    getTask,
    getLatestNews,
    getClothesData
}