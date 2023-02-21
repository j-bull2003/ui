const mongoose = require('mongoose')
const { STRING_REQUIRED_TRIM, STRING_REQUIRED, STRING, CREATED_DATE, BOOLEAN_DEFAULT, REF_OBJECT_ID, NUMBER_REQUIRED, ARRAY, BOOLEAN_DEFAULT_TRUE, NUMBER } = require('./SchemaType')

const taskSchema = new mongoose.Schema({
    userId: REF_OBJECT_ID('user'),
    description: STRING,
    isDeleted: BOOLEAN_DEFAULT,
    isCompleted: BOOLEAN_DEFAULT,
    created: CREATED_DATE
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task