import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
},{timestamps:true})

userschema.methods.gettoken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}

const User = mongoose.model("User",userschema)

export default User