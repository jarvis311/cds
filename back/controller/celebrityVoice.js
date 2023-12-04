import mongoose from "mongoose";
import CelebrityVoiceModel from "../model/celebrityVoice.js";
import { CatchErrors, ResponseError, ResponseSuccess, ResponseSuccessmsg, ResponseWithTokenSuccess } from "../ResponseMsg/ResponseMsg.js"




export const createCelebrityVoice = async(req,res) => {
    let {
        name,
        thumb_image_url,
        premium_status,
        reward_status,
        status
    } = req.body
    try {
        let position = await CelebrityVoiceModel.findOne({}).select('position').sort({ position: -1 })
        position = position ? position.position + 1 : 1
        const addVoice = await CelebrityVoiceModel.create({
            name:name,
            thumb_image_url:thumb_image_url,
            premium_status:premium_status,
            reward_status:reward_status,
            status:status,
            position:position
        })
        if(addVoice){
            return res.json(await ResponseSuccessmsg("Categories Save Successfully"))
        }else {
            return res.json(await ResponseError("Something Went Wrong"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
} 
export const getCelebrityVoice = async(req,res) => {

    try {
        try {
            const celebrity = await CelebrityVoiceModel.find({}).sort({ position: 1 })
            if (celebrity.length != 0) {
                return res.json(await ResponseSuccess("Data Found Successfully", celebrity))

            } else {
                return res.json(await ResponseError("Data Not Found!"))
            }
        } catch (error) {
            return res.json(await ResponseMsg.CatchErrors(404, error.message))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
} 

export const updateCelebrityVoice = async (req, res) => {
    let { name,
        thumb_image_url,
        premium_status,
        reward_status,
        status,
        position,
        _id
    } = req.body
    try {
        if (name == "") {
            return res.json(await ResponseError("Name field is required !!!"))
        }
        const celebrity = await CelebrityVoiceModel.findByIdAndUpdate(_id, {
            name:name,
            thumb_image_url:thumb_image_url,
            premium_status:premium_status,
            reward_status:reward_status,
            status:status,
            position:position
        }, { new: true })
        if (celebrity) {
            return res.json(await ResponseSuccessmsg("Celebrity Voice Update Successfully"))
        } else {
            return res.json(await ResponseError("Something Went Wrong"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

export const deleteCelebrityVoice = async (req, res) => {
    const { _id } = req.body
    try {
        const response = await CelebrityVoiceModel.findByIdAndDelete(_id)
        if (response) {
            return res.json(await ResponseSuccessmsg("Data Delete Successfully"))

        } else {
            return res.json(await ResponseError("Something Went Wrong!"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

export const getCelebrityVoiceById = async (req, res) => {
    try {
        const { _id } = req.body
        var Result = await CelebrityVoiceModel.findById(_id)
        if (Result) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}