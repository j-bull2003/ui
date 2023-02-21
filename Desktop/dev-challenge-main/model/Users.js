const mongoose = require('mongoose')
const { STRING_REQUIRED_TRIM, STRING_REQUIRED, STRING, CREATED_DATE, BOOLEAN_DEFAULT, REF_OBJECT_ID, NUMBER_REQUIRED, ARRAY, BOOLEAN_DEFAULT_TRUE, NUMBER } = require('./SchemaType')

const userSchema = new mongoose.Schema({
    fullName: STRING_REQUIRED_TRIM,
    email: {
        ...STRING_REQUIRED_TRIM,
        lowercase: true
    },
    imageUrl: STRING,
    password: STRING_REQUIRED,
    created: CREATED_DATE
})

const User = mongoose.model('user', userSchema)

module.exports = User