const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const { cloudinary } = require('../config')
const { User } = require('../model')
const { getUser } = require('../controllers/get')
const fs = require('fs')

const signUp = async (req, res) => {
    try {
        const { body } = req
        const file = req?.file
        const { email, password, fullName } = body
        // console.log('file', file)
        if (!file || !email || !password || !fullName) {
            return res.send({ success: false, message: 'Please provide all required fields!' })
        }

        User.findOne({ fullName })
            .then(async (response) => {
                if (response) {
                    return res.send({ success: false, message: 'Username already in use!' })
                }
                await cloudinary.cloudinary.uploader.upload(file?.path, async (result, err) => {
                    if (err) {
                        return res.send({ success: false, message: 'File uploading Error!' })
                    }
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(body.password, salt, async (err, hash) => {
                            if (err) {
                                return res.send({ success: false })
                            }
                            body.imageUrl = result?.secure_url
                            body.password = hash
                            try {
                                fs.unlinkSync(file?.path)
                            }
                            catch (e) {
                                console.log('e..', e)
                            }
                            let user = new User(body)
                            user.save()
                                .then(() => {
                                    return res.send({ success: true, message: 'Successfully Signup!' })
                                }).catch(e => {
                                    console.log('e', e)
                                    return res.send({ success: false, message: 'Something Went Wrong!', e })
                                })
                        })
                    })
                })
            })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const logIn = (req, res) => {
    try {
        const { body } = req
        const { fullName, password } = body

        if (!fullName || !password) {
            return res.send({ success: false, message: 'Please Provide All Values' })
        }

        User.findOne({ fullName: fullName })
            .then((response) => {
                if (response) {
                    return bcrypt.compare(password, response?.password, (err, result) => {
                        if (err || !result) {
                            return res.send({ success: false, message: 'Oops, incorrect password!' })
                        }

                        req.params.id = response?._id

                        return getUser(req, res)
                    })
                }
                return res.send({ success: false, message: 'Oops, incorrect Username!' })
            })
            .catch((e) => res.send({ success: false, message: 'Oops, Incorrect Username..!' }))
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

module.exports = {
    signUp,
    logIn
}