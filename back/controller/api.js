import mongoose from "mongoose";
import Categories from "../model/Categories.js";
import { CatchErrors, ResponseApiPagination, ResponseError, ResponseSuccessmsg } from "../ResponseMsg/ResponseMsg.js";
import Reels from "../model/Reels.js";
import path from "path"
import fs from 'fs'

const ReelsData = async (req, res) => {
    try {
        var Result
        var limit = (!req.body.limit || req.body.limit == "" || req.body.limit == 0) ? 10 : parseInt(req.body.limit)
        var page = (!req.body.page || req.body.page == "" || req.body.page == 0) ? 1 : parseInt(req.body.page)
        var skip = ((limit) * ((page) - 1));
        var Alldata = await Reels.find({ status: 1 }).select({ _id: 1 })
        limit = Alldata.length
        var Total_Page = Math.ceil(Alldata.length / limit);

        if (Total_Page < page) {
            return res.send(await ResponseError("Data Not Found"));
        } else {
            Result = await Reels.aggregate([
                {
                    $match: { status: 1 }
                },
                {
                    $sample: { size: Alldata.length }
                },
                {
                    $skip: skip
                },
                // {
                //     $limit: limit
                // },
                {
                    $project: { video: 1, categories_id: 1, sound_name: 1 }
                }
            ])

            page = 1

            return res.json(await ResponseApiPagination("Data Found Successfully", Result, parseInt(limit), Total_Page, page))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsUpdate = async (req, res) => {
    try {
        var { categories_id, status, _id, sound_name } = req.body

        if (!req.body._id || req.body._id == "") {
            return res.json(await ResponseError("Required _id field"))
        } else {
            var video = ""
            var Datafind = await Reels.findOne({ _id: _id })

            const resfun = async () => {
                const data = {
                    categories_id: (categories_id) ? categories_id : Datafind.categories_id,
                    video: video,
                    status: (status) ? status : Datafind.status,
                    sound_name: (sound_name) ? sound_name : Datafind.sound_name
                }

                var Result = await Reels.findByIdAndUpdate({ _id }, data, { new: true })
                if (Result) {
                    return res.json(await ResponseSuccessmsg("Reels Update Successfully"))
                }
                else {
                    return res.json(await ResponseError("Something Went Wrong"))
                }
            }

            if (Datafind) {
                video = Datafind.video
                if (req.files) {
                    if (req.files.video) {
                        if (Datafind.video != "") {
                            var filearr = path.parse(Datafind.video)
                            fs.unlink('public/img/video/' + filearr['base'], (err) => {
                                if (err) {
                                    console.log("video not found");
                                }
                            })
                        }
                        var file = req.files.video
                        var extension = file.name.split(".")
                        var filename = "image_" + Date.now() + "." + extension[extension.length - 1]

                        file.mv("public/img/video/" + filename, async (error) => {
                            if (error) {
                                return res.json(await ResponseError(error.message))
                            } else {
                                video = `${process.env.APP_URL}img/video/${filename}`
                                resfun()
                            }
                        })
                    }
                } else {
                    resfun()
                }

            } else {
                return res.json(await ResponseError("Data Not Found!"))
            }
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

export { ReelsData, ReelsUpdate }