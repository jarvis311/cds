require('dotenv').config()
const Stamps = require("../modal/stamps")
const Admin = require("../modal/user")
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrtpt = require('bcrypt')
const AWS = require('aws-sdk')
const axios = require('axios')
const cheerio = require('cheerio')
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
const { default: mongoose } = require("mongoose");

const ResponseMsg = require("../ResponseMsg/ResponseMsg")
const helper = require("../helper/helper")
const registration = require('../modal/registration')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const User = require('../modal/user')

// -------------------------------------- Web Api -------------------------------------- */

exports.StampsAll = async (req, res) => {
    try {
        // const Result = await Stamps.find({}).select({ _id: 1, thumb_image: 1, zip_name: 1, zip_name_ios: 1, is_premium: 1, is_premium_ios: 1, status: 1, status_ios: 1 })
        const Result = await Stamps.find({})
            .select({
                _id: 1,
                thumb_image: 1,
                zip_name: 1,
                zip_name_ios: 1,
                is_premium: 1,
                is_premium_ios: 1,
                status: 1,
                status_ios: 1,
                category_id: 1, // Include the category_id field
            })
            .populate('category_id', { _id: 1, name: 1 }).sort({ position: 1 });

        if (Result.length != 0) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", Result))
        }
        else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsAdd = async (req, res) => {
    try {
        var { is_premium, is_premium_ios, status, status_ios, category_id } = req.body
        var main_image = ""
        var zip_name = ""
        var zip_name_ios = ""

        if (req.files) {
            if (req.files.main_image) {
                main_image = await helper.UploadImage(req.files.main_image, "stamp", "thumb_image")
            }
            if (req.files.zip_name) {
                zip_name = await helper.UploadImage(req.files.zip_name, "stamp", "zipname")
            }

            if (req.files.zip_name_ios) {
                zip_name_ios = await helper.UploadImage(req.files.zip_name_ios, "stamp", "zipnameios")
            }
        }

        var phpid = await Stamps.findOne({}).select('php_id').sort({ php_id: -1 })
        let position = await Stamps.findOne({}).select('position').sort({ position: -1 })
        position = position ? position.position + 1 : 1
        var data = {
            php_id: (phpid) ? phpid.php_id + 1 : 1,
            thumb_image: main_image,
            zip_name: zip_name,
            zip_name_ios: zip_name_ios,
            is_premium: is_premium,
            is_premium_ios: is_premium_ios,
            status: status,
            status_ios: status_ios,
            category_id: category_id == "" ? null : category_id,
            position: position,
        }
        var Result = await Stamps.create(data)
        console.log(Result);
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Stamps Save Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }

    } catch (error) {
        console.log("cache error");
        console.log(error);
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsView = async (req, res) => {
    try {
        var { _id } = req.body
        var Result = await Stamps.findOne({ _id: _id }).populate('category_id', { _id: 1, name: 1 })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", Result))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsUpdate = async (req, res) => {
    try {
        var { is_premium, is_premium_ios, status, status_ios, _id, category_id } = req.body
        var Stampfind = await Stamps.findOne({ _id: _id })
        var thumb_image = Stampfind.main_image
        var zip_name = Stampfind.zip_name
        var zip_name_ios = Stampfind.zip_name_ios

        if (req.files) {
            if (req.files.main_image) {
                await helper.DeleteImage(Stampfind.main_image, "stamp",)
                thumb_image = await helper.UploadImage(req.files.main_image, "stamp", "thumb_image")
                //thumb_image = main_image
            }
            if (req.files.zip_name) {
                await helper.DeleteImage(Stampfind.zip_name, "stamp")
                zip_name = await helper.UploadImage(req.files.zip_name, "stamp", "zipname")
            }

            if (req.files.zip_name_ios) {
                await helper.DeleteImage(Stampfind.zip_name_ios, "stamp")
                zip_name_ios = await helper.UploadImage(req.files.zip_name_ios, "stamp", "zipnameios")
            }
        }

        var data = {
            thumb_image: thumb_image,
            zip_name: zip_name,
            zip_name_ios: zip_name_ios,
            is_premium: is_premium,
            is_premium_ios: is_premium_ios,
            status: status,
            status_ios: status_ios,
            category_id: category_id == "" ? null : category_id

        }
        var Result = await Stamps.findByIdAndUpdate({ _id: _id }, data, { new: true })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Stamps Update Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }

    } catch (error) {
        console.log(error)
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsDelete = async (req, res) => {
    try {
        var { _id } = req.body
        var Stampfind = await Stamps.findOne({ _id: _id })
        if (Stampfind.thumb_image != "") {
            await helper.DeleteImage(Stampfind.thumb_image, "stamp")
        }
        if (Stampfind.zip_name != "") {
            await helper.DeleteImage(Stampfind.zip_name, "stamp")
        }
        if (Stampfind.zip_name_ios != "") {
            await helper.DeleteImage(Stampfind.zip_name_ios, "stamp")
        }

        const Result = await Stamps.findByIdAndDelete({ _id: _id })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Stamps Delete Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }

    } catch (error) {
        console.log(error)
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsIsPremiumUpdate = async (req, res) => {
    try {
        var { _id, is_premium } = req.body
        var Result = await Stamps.findByIdAndUpdate({ _id: _id }, { is_premium: is_premium }, { new: true })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Is Premium Update Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampsIsPremiumIosUpdate = async (req, res) => {
    try {
        var { _id, is_premium_ios } = req.body
        var Result = await Stamps.findByIdAndUpdate({ _id: _id }, { is_premium_ios: is_premium_ios }, { new: true })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Is Premium Ios Update Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampStatusUpdate = async (req, res) => {
    try {
        var { _id, status } = req.body
        var Result = await Stamps.findByIdAndUpdate({ _id: _id }, { status: status }, { new: true })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Status Update Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.StampStatusIosUpdate = async (req, res) => {
    try {
        var { _id, status_ios } = req.body
        var Result = await Stamps.findByIdAndUpdate({ _id: _id }, { status_ios: status_ios }, { new: true })
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccessmsg(200, "Status Ios Update Successfully"))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}
exports.updateStampPosition = async (req, res) => {
    let { newOrder, pageInformation } = req.body;
    let ids = JSON.parse(newOrder);

    try {
        const dataOfArray = await Stamps.find({}).sort({ position: 1 });
        const currentPage = Math.max(1, Math.floor(pageInformation.currentPage));
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const subsetOfData = dataOfArray.slice(startIndex, endIndex);

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const documentToUpdate = subsetOfData.find(doc => doc._id.toString() === id);
            if (documentToUpdate) {
                const newPosition = startIndex + i + 1;
                const r = await Stamps.findByIdAndUpdate(id, { position: newPosition });
                console.log(`Document with ID ${id} updated successfully. New position: ${newPosition}`);
            }
        }
        return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", []));
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message));
    }
};

exports.NewsAll = async (req, res) => {
    try {
        const Result = await News.find({}).select({ _id: 1, header: 1, title: 1, news_url: 1, description: 1, short_description: 1, latitude: 1, longitude: 1, location_name: 1, is_active: 1 }).sort({ title: 1 })
        if (Result.length != 0) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", Result))
        }
        else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}


exports.destination_details = async (req, res) => {
    try {
        var Result = await News.aggregate([
            {
                $match: { $and: [{ news_url: { $regex: req.body.title, $options: 'i' } }, { is_active: 1 }] }
            },
            {
                $lookup: {
                    from: 'news_images',
                    localField: '_id',
                    foreignField: 'news_id',
                    pipeline: [
                        {
                            $project: { news_id: 1, image: 1 }
                        }
                    ],
                    as: 'news_image'
                }
            },
            {
                $project: { header: 1, title: 1, news_url: 1, description: 1, short_description: 1, latitude: 1, longitude: 1, location_name: 1, is_active: 1, news_image: 1 }
            }
        ])

        if (Result.length !== 0) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", Result[0]))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Data Not Found"))
        }

    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.Register = async (req, res) => {
    try {
        var { email, password } = req.body
        var data = {
            email: email,
            password: await bcrypt.hash(password, 10)
        }
        var Result = await User.create(data)
        if (Result) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Save Successfully", Result))
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Something Went To Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.RegisterUpdate = async (req, res) => {
    try {
        var { _id, email, password } = req.body
        password = await bcrypt.hash(password, 10)
        var Result = await User.findByIdAndUpdate({ _id: _id }, { email, password }, { new: true })
        return res.json(await ResponseMsg.ResponseSuccess(200, "User Update Successfully", Result))
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.Login = async (req, res) => {
    try {
        var { email, password } = req.body
        var Result = await User.findOne({ email: email })
        if (Result) {
            var CheckPassword = await bcrypt.compare(password, Result.password)
            if (CheckPassword === true) {
                var token = await Result.gettoken()
                var Response = {
                    _id: Result._id,
                    email: Result.email,
                    password: Result.password
                }
                return res.json(await ResponseMsg.ResponseWithTokenSuccess(200, "User Login Successfully", Response, token))
            }
            else {
                return res.json(await ResponseMsg.ResponseErrormsg(404, "Please Enter Valid Password"))
            }
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Your Email Id Does Not Exist"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.Authenticat = async (req, res, next) => {
    try {
        var authorization = req.headers.authorization
        if (authorization) {
            var token = authorization.split(' ')[1]
            var verif = jwt.verify(token, "VoiceGps")
            if (verif?.Status !== false) {
                req.verifytoken = token
                var Result = await User.findOne({ _id: verif._id })
                var CheckToken = Result.tokens.filter((curr) => {
                    return curr.token === token
                })

                if (CheckToken.length === 0) {
                    return res.json(await ResponseMsg.ResponseErrormsg(404, "Enter Your Invalid Token"))
                }
                else {
                    req.register = Result
                    req.token = token
                    next()
                }
            }
        }
        else {
            return res.json(await ResponseMsg.ResponseErrormsg(404, "Please Enter Your Token"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

exports.Logout = async (req, res) => {
    try {
        req.register.tokens = req.register.tokens.filter((curr) => {
            return curr.token !== req.token
        })
        await req.register.save()
        return res.json(await ResponseMsg.ResponseSuccessmsg(200, "User Logout Successfully"))
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

// -------------------------------------- End Web Api -------------------------------------- */


// -------------------------------------- Android Api -------------------------------------- */

exports.social_login = async (req, res) => {
    try {
        console.log("social_login start")
        if (!req.body.email || req.body.email == "") {
            return res.json(await ResponseMsg.ResponseErrorApi("The email field is required."))
        }
        if (!req.body.login_type || req.body.login_type == "") {
            return res.json(await ResponseMsg.ResponseErrorApi("The login_type field is required."))
        }
        var name = req.body.name
        var email = req.body.email
        var login_type = req.body.login_type
        var image = ""

        if (req.files) {
            if (req.files.image) {
                var UploadImages = await helper.ImageUpload('social_images', req.files.image)
                var image = UploadImages
            }
        }

        var user = await registration.findOne({ email: email })
        if (user) {
            return res.json(await ResponseMsg.ResponseErrorApi("This Email-id already Register."))
        }
        else {
            var phpid = await registration.findOne({}).select('php_id').sort({ php_id: -1 })
            var data = {
                php_id: (phpid) ? phpid.php_id + 1 : 1,
                name: name,
                email: email,
                login_type: login_type,
                image: image
            }

            var Result = await registration.create(data)
            var data = {
                name: Result.name,
                email: Result.email,
                login_type: Result.login_type,
                image: Result.image
            }
            return res.json(await ResponseMsg.ResponseWithDataApi("Success", data))
        }
    } catch (error) {
        console.log(error)
        await helper.notificationFunc("Social Login Api Is Down", error.message)
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

const encrypt_decrypt = async (type, data) => {
    try {
        if (type == "enc") {
            var cipher = crypto.createCipheriv('aes-128-ecb', "V@$undh@r@50599#", null)
            var res = Buffer.concat([cipher.update(data), cipher.final()]).toString("base64")
        }
        else {
            let decipher = crypto.createDecipheriv('aes-128-ecb', "V@$undh@r@50599#", null);
            var res = Buffer.concat([decipher.update(Buffer.from(data, "base64")), decipher.final()]).toString("utf-8")
        }
        return res
    } catch (error) {
        console.log(error)
    }
}

exports.get_all_stamp = async (req, res) => {
    try {
        console.log("get_all_stamp start")
        if (!req.body.type || req.body.type == "") {
            return res.json(await ResponseMsg.ResponseError(400, "Type Is Required"))
        }
        if (!req.body.version_code || req.body.version_code == "") {
            return res.json(await ResponseMsg.ResponseError(400, "Version Is Required"))
        }
        if (req.body.type && req.body.type == "ios") {
            var res_stamp = await Stamps.aggregate([
                {
                    $match: { status_ios: 1 }
                },
                {
                    $project: {
                        _id: 1,
                        thumb_image: 1,
                        'zip': '$zip_name_ios',
                        'is_premium': { $cond: { if: { $eq: ['$is_premium_ios', 1] }, then: true, else: false } }
                    }
                }
            ])
        }
        else {

            var res_stamp = await Stamps.aggregate([
                {
                    $match: { status: 1 }
                },
                {
                    $project: {
                        _id: 1,
                        thumb_image: 1,
                        'zip': '$zip_name',
                        is_premium: { $cond: { if: { $eq: ['$is_premium', 1] }, then: true, else: false } },
                    }
                }
            ])
        }

        if (res_stamp.length != 0) {
            return res.json(await ResponseMsg.ResponseWithDataApi("success", res_stamp))
        }
        else {
            console.log("hellllo")
            return res.json(await ResponseMsg.ResponseErrorApiNew("Data Not Found"))
        }
    } catch (error) {
        console.log(error)
        await helper.notificationFunc("Get All Stamp Api Is Down", error.message)
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

// -------------------------------------- Web Api -------------------------------------- */

/* End Android Api (vishal) */
