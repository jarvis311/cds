import mongoose from 'mongoose'

const ReelsSchema = new mongoose.Schema({
    categories_id: {
        type: Number,
    },
    video: {
        type: String
    },
    status: {
        type: Number,
        enum: [1, 0]
    },
    sound_name: {
        type: String
    }
}, { timestamps: true })

const Reels = mongoose.model('Reels', ReelsSchema)
export default Reels
