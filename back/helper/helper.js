import jwt from 'jsonwebtoken'
import config from '../config.js'
import { CatchErrors } from '../ResponseMsg/ResponseMsg.js'
import bcrypt from 'bcrypt'


const CreateJwtToken = async function (data) {
    try {
        var token = jwt.sign(data, config.JWT_SECRET)
        return token
    } catch (error) {
        return await CatchErrors(error.message)
    }
}

const VerifyJwtToken = async function (data) {
    try {
        var verif = jwt.verify(data, config.JWT_SECRET)
        return verif
    } catch (error) {
        return await CatchErrors(error.message)
    }
}

const CreateBcryptPassword = async function (password) {
    try {
        var hash_password = await bcrypt.hash(password, 10)
        return hash_password
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

const CheckBcryptPassword = async function (password, hashpassword) {
    try {
        const CheckPassword = await bcrypt.compare(password, hashpassword)
        return CheckPassword
    } catch (error) {
        return await CatchErrors(Not_Found, error.message)
    }
}

export { CreateJwtToken, VerifyJwtToken, CreateBcryptPassword, CheckBcryptPassword }