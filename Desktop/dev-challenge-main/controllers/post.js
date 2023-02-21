const { cloudinary } = require('../config')
const { Photo, Task } = require('../model')
const fs = require('fs')
const Jimp = require("jimp")
const { v4: uuidv4 } = require('uuid')

const addPhoto = async (req, res) => {
    try {
        const { body } = req
        const file = req?.file
        let fileId = uuidv4()
        let width = Number(280)
        let height = Number(280)
        console.log('file', body)
        console.log('file', file)

        if (!file || !body?.userId) {
            return res.send({ success: false, message: 'Please provide all required fields!' })
        }

        let originalName = file?.originalname?.split('.')[0]
        
        Jimp.read(file?.path)
            .then(async (image) => {
                const updatedFilePath = `uploads/${fileId}-${file?.originalname}`
                await image.resize(width, height, Jimp.RESIZE_BEZIER).writeAsync(updatedFilePath)
                await cloudinary.cloudinary.uploader.upload(updatedFilePath, (result, err) => {
                    if (err) {
                        console.log('e', err)
                        return res.send({ success: false, message: 'Something Went Wrong!' })
                    }
                    body.imageUrl = result?.secure_url
                    body.imageName = originalName

                    try {
                        fs.unlinkSync(file?.path)
                        fs.unlinkSync(updatedFilePath)
                    }
                    catch (e) {
                        console.log('e', e)
                    }
                    let addPhoto = new Photo(body)
                    addPhoto.save()
                        .then(() => {
                            return res.send({ success: true, message: 'Successfully Uploaded!' })
                        }).catch(e => {
                            console.log('e', e)
                            return res.send({ success: false, message: 'Something Went Wrong!', e })
                        })
                })
            })
            .catch(err => {
                console.log('e', err)
                return res.send({ success: false, message: 'File Uploading Error!', e: err?.message })
            })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const deletePhoto = (req, res) => {
    try {
        const { body } = req
        const { _id } = body

        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        Photo.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            return res.send({ success: true, message: 'Successfully Deleted!' })
        })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const addTask = (req, res) => {
    try {
        const { body } = req
        const { userId, description } = body

        if (!userId || !description) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        let addTask = new Task(body)
        addTask.save()
            .then(() => {
                return res.send({ success: true, message: 'Successfully Added!' })
            }).catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!', e })
            })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}

const updateTask = (req, res) => {
    try {
        const { body } = req
        const { _id, isCompleted } = body

        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        Task.findByIdAndUpdate(_id, { isCompleted: isCompleted }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            return res.send({ success: true, message: `Successfully ${isCompleted ? 'Completed' : 'InCompleted'} !` })
        })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', e: e?.message })
    }
}


module.exports = {
    addPhoto,
    deletePhoto,
    addTask,
    updateTask
}