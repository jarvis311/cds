const mongoose = require('mongoose')

const registrationSchema = mongoose.Schema({
    php_id: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    login_type: {
        type: String,
        default: 0,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const registration = mongoose.model('registration', registrationSchema)

module.exports = registration;