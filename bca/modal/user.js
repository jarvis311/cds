const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

UserSchema.methods.gettoken = async function () {
    const token = jwt.sign({ _id: this._id }, "VoiceGps")
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}

const User = mongoose.model('user', UserSchema)

module.exports = User;

