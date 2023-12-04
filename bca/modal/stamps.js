const mongoose = require('mongoose')

const StampSchema = mongoose.Schema({
    php_id: {
        type: Number
    },
    thumb_image: {
        type: String
    },
    zip_name: {
        type: String,
        default: null
    },
    zip_name_ios: {
        type: String
    },
    is_premium: {
        type: Number
    },
    is_premium_ios: {
        type: Number,
        default: 0
    },
    status: {
        type: Number
    },
    status_ios: {
        type: Number,
        default: 0
    },
    position: {
        type: Number,
        default: 0
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        default: null,
        require: false
    },
}, { timestamps: true })

const Stamps = mongoose.model('Stamps', StampSchema)

module.exports = Stamps;
