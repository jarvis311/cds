import mongoose from 'mongoose'

const CelebrityVoice = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
    },
    thumb_image_url: {
        type: String
    },
    premium_status: {
        type: Number,
        // enum: [1, 0]
    },
    reward_status: {
        type: Number,
        // enum: [1, 0]
    },
    status: {
        type: Number,
        // enum: [1, 0]
    },
    position:{
        type: Number,
        default:1
    }
}, { timestamps: true })

const CelebrityVoiceModel = mongoose.model('Celebrity-voice', CelebrityVoice)
export default CelebrityVoiceModel
