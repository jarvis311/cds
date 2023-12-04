import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
    },
    image: {
        type: String
    },
    status: {
        type: Number,
        enum: [1, 0]
    }
}, { timestamps: true })

const Categories = mongoose.model('categories', CategoriesSchema)
export default Categories
