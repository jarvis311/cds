const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    },
    position: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const categoryModel = mongoose.model('Categories', categorySchema)

module.exports = categoryModel;