import mongoose from "mongoose"
import { CatchErrors, ResponseError, ResponseSuccess, ResponseSuccessmsg, ResponseWithTokenSuccess } from "../ResponseMsg/ResponseMsg.js"
import Categories from "../model/Categories.js"
import fs from 'fs'
import path from "path"
import Reels from "../model/Reels.js"
import Register from "../model/Register.js"
import { CheckBcryptPassword, CreateBcryptPassword, VerifyJwtToken } from "../helper/helper.js"


const CategoriesAdd = async (req, res) => {
    try {
        var { name, status } = req.body
        var image = ""

        const resfun = async () => {
            var id = await Categories.findOne({}).sort({ id: -1 })
            const data = {
                id: (id) ? id.id + 1 : 1,
                name: name,
                image: image,
                status: status
            }

            var Result = await Categories.create(data)
            if (Result) {
                return res.json(await ResponseSuccessmsg("Categories Save Successfully"))
            }
            else {
                return res.json(await ResponseError("Something Went Wrong"))
            }
        }

        if (req.files) {
            if (req.files.image) {
                var file = req.files.image
                var extension = file.name.split(".")
                var filename = "image_" + Date.now() + "." + extension[extension.length - 1]

                file.mv("public/img/image/" + filename, async (error) => {
                    if (error) {
                        return res.json(await ResponseError(error.message))
                    } else {
                        image = `${process.env.APP_URL}img/image/${filename}`
                        resfun()
                    }
                })
            }
        } else {
            resfun()
        }

    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesView = async (req, res) => {
    try {
        const { _id } = req.body
        var Result = await Categories.findById(_id).select({ __v: 0 })
        if (Result) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesDelete = async (req, res) => {
    try {
        const { _id } = req.body
        var DataFind = await Categories.findById(_id)
        if (DataFind) {
            var filearr = path.parse(DataFind.image)
            fs.unlink('public/img/image/' + filearr['base'], (err) => {
                if (err) {
                    console.log("image not found");
                }
            })
            var Result = await Categories.findByIdAndDelete(_id)
            if (Result) {
                return res.json(await ResponseSuccessmsg("Categories Delete Successfully"))
            } else {
                return res.json(await ResponseError("Something Went Wrong!"))
            }
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesStatusUpdate = async (req, res) => {
    try {
        var { _id, status } = req.body
        var Result = await Categories.findByIdAndUpdate({ _id }, { status }, { new: true })
        if (Result) {
            return res.json(await ResponseSuccessmsg("Categories Status Update Successfully"))
        } else {
            return res.json(await ResponseError("Something Went Wrong!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesUpdate = async (req, res) => {
    try {
        var { name, status, _id } = req.body
        var image = ""
        var Datafind = await Categories.findOne({ _id: _id })

        const resfun = async () => {
            const data = {
                name: name,
                image: image,
                status: status
            }

            var Result = await Categories.findByIdAndUpdate({ _id }, data, { new: true })
            if (Result) {
                return res.json(await ResponseSuccessmsg("Categories Update Successfully"))
            }
            else {
                return res.json(await ResponseError("Something Went Wrong"))
            }
        }

        if (Datafind) {
            image = Datafind.image
            if (req.files) {
                if (req.files.image) {
                    if (Datafind.image != "") {
                        var filearr = path.parse(Datafind.image)
                        fs.unlink('public/img/image/' + filearr['base'], (err) => {
                            if (err) {
                                console.log("image not found");
                            }
                        })
                    }
                    var file = req.files.image
                    var extension = file.name.split(".")
                    var filename = "image_" + Date.now() + "." + extension[extension.length - 1]

                    file.mv("public/img/image/" + filename, async (error) => {
                        if (error) {
                            return res.json(await ResponseError(error.message))
                        } else {
                            image = `${process.env.APP_URL}img/image/${filename}`
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
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesAll = async (req, res) => {
    try {
        const Result = await Categories.find({}).select({ id: 1, name: 1, image: 1, status: 1 }).sort({ id: -1 })
        if (Result.length != 0) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const CategoriesAllId = async (req, res) => {
    try {
        const Result = await Categories.find({}).select({ _id: 0, id: 1, name: 1 })
        if (Result) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}


const CategoriesSearch = async (req, res) => {
    try {
        const { name } = req.body
        const Result = await Categories.find({ name: { $regex: name, $options: "i" } }).select({ id: 1, name: 1, image: 1, status: 1 }).sort({ id: -1 })
        if (Result.length != 0) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsAdd = async (req, res) => {
    try {
        var { categories_id, status, sound_name } = req.body
        var video = ""

        if (req.files) {
            if (req.files.video) {
                var file = req.files.video
                var extension = file.name.split(".")
                var filename = "video_" + Date.now() + "." + extension[extension.length - 1]

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

        const resfun = async () => {
            const data = {
                categories_id: categories_id,
                video: video,
                status: status,
                sound_name: sound_name
            }

            var Result = await Reels.create(data)
            if (Result) {
                return res.json(await ResponseSuccessmsg("Reels Save Successfully"))
            }
            else {
                return res.json(await ResponseError("Something Went Wrong"))
            }
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsView = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await Reels.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories_id",
                    foreignField: "id",
                    pipeline: [{ $project: { name: 1, _id: 0, id: 1 } }],
                    as: "categories_id"
                }
            },
            {
                $unwind: '$categories_id'
            },
            {
                $project: { sound_name: 1, status: 1, video: 1, categories_id: 1 }
            }
        ])
        if (Result.length != 0) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsEdit = async (req, res) => {
    try {
        const { _id } = req.body
        var Result = await Reels.findById(_id).select({ __v: 0 })
        if (Result) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsDelete = async (req, res) => {
    try {
        const { _id } = req.body
        var DataFind = await Reels.findById(_id)
        if (DataFind) {
            var filearr = path.parse(DataFind.video)
            fs.unlink('public/img/video/' + filearr['base'], (err) => {
                if (err) {
                    console.log("video not found");
                }
            })
            var Result = await Reels.findByIdAndDelete(_id)
            if (Result) {
                return res.json(await ResponseSuccessmsg("Reels Delete Successfully"))
            } else {
                return res.json(await ResponseError("Something Went Wrong!"))
            }
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsStatusUpdate = async (req, res) => {
    try {
        var { _id, status } = req.body
        var Result = await Reels.findByIdAndUpdate({ _id }, { status }, { new: true })
        if (Result) {
            return res.json(await ResponseSuccessmsg("Reels Status Update Successfully"))
        } else {
            return res.json(await ResponseError("Something Went Wrong!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsUpdate = async (req, res) => {
    try {
        var { categories_id, status, _id, sound_name } = req.body
        var video = ""
        var Datafind = await Reels.findOne({ _id: _id })

        const resfun = async () => {
            const data = {
                categories_id: categories_id,
                video: video,
                status: status,
                sound_name: sound_name
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
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsAll = async (req, res) => {
    try {
        const Result = await Reels.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categories_id",
                    foreignField: "id",
                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                    as: "categories_id"
                }
            },
            {
                $unwind: '$categories_id'
            },
            {
                $sort: { _id: -1 }
            },
            {
                $project: { sound_name: 1, status: 1, video: 1, categories_id: 1 }
            }
        ])
        if (Result.length != 0) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const ReelsSearch = async (req, res) => {
    try {
        const { name } = req.body
        const Result = await Reels.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categories_id",
                    foreignField: "id",
                    pipeline: [{ $match: { name: { $regex: name, $options: 'i' } } }, { $project: { name: 1, _id: 0 } }],
                    as: "categories_id"
                }
            },
            {
                $unwind: '$categories_id'
            },
            {
                $sort: { _id: -1 }
            },
            {
                $project: { sound_name: 1, status: 1, video: 1, categories_id: 1 }
            }
        ])
        if (Result.length != 0) {
            return res.json(await ResponseSuccess("Data Found Successfully", Result))
        } else {
            return res.json(await ResponseError("Data Not Found!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const Registers = async (req, res) => {
    try {
        var { email, password } = req.body
        password = await CreateBcryptPassword(password)
        const Result = await Register.create({ email: email, password: password })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const RegisterUpdate = async (req, res) => {
    try {
        var { _id, email, password } = req.body
        password = await CreateBcryptPassword(password)
        const Result = await Register.findByIdAndUpdate({ _id: _id }, { email: email, password: password }, { new: true })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const Result = await Register.findOne({ email: email }).select({ __v: 0 })
        if (Result) {
            const CheckPassword = await CheckBcryptPassword(password, Result.password)
            if (CheckPassword === true) {
                const token = await Result.gettoken()
                const Response = {
                    _id: Result._id,
                    email: Result.email,
                    password: Result.password
                }
                return res.json(await ResponseWithTokenSuccess("User Login Successfully", Response, token))
            } else {
                return res.json(await ResponseError("Please Enter Valid Password!"))
            }
        } else {
            return res.json(await ResponseError("Your Email Id Does Not Exist!"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const Logout = async (req, res) => {
    try {
        req.register.tokens = req.register.tokens.filter((curr) => {
            return curr.token !== req.token
        })
        await req.register.save()
        return res.json(await ResponseSuccessmsg("User Logout Successfully"))

    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

const Authenticat = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (authorization) {
            const token = authorization.split(' ')[1]
            const verif = await VerifyJwtToken(token)
            if (verif?.Status !== false) {
                req.verifytoken = token
                var Result = await Register.findOne({ _id: verif._id }).select({ __v: 0 })
                var CheckToken = Result.tokens.filter((curr) => {
                    return curr.token === token
                })
                if (CheckToken.length == 0) {
                    return res.json(await ResponseError("Enter Your Invalid Token!"))
                } else {
                    req.register = Result
                    req.token = token
                    next()
                }
            } else {
                return res.json(verif)
            }
        } else {
            return res.json(await ResponseError("Please Enter Your Token"))
        }
    } catch (error) {
        return res.json(await CatchErrors(error.message))
    }
}

export {
    CategoriesAdd, CategoriesView, CategoriesDelete, CategoriesStatusUpdate, CategoriesUpdate, CategoriesAll, CategoriesAllId, CategoriesSearch,
    ReelsAdd, ReelsView, ReelsDelete, ReelsStatusUpdate, ReelsUpdate, ReelsAll, ReelsEdit, ReelsSearch,
    Registers, RegisterUpdate, Login, Logout, Authenticat
}
