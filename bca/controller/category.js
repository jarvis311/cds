// const { ResponseMsg, ResponseSuccessmsg } = require("../ResponseMsg/ResponseMsg");
const { default: mongoose } = require("mongoose");
const categoryModel = require("../modal/category");
const ResponseMsg = require('../ResponseMsg/ResponseMsg')


const getCategories = async (req, res) => {
    let { limit, page } = req.body
    try {
        const category = await categoryModel.find({}).select({ name: 1, position: 1, status: 1 }).sort({ position: 1 })
        if (category.length != 0) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", category))
        } else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

const createCategories = async (req, res) => {
    let { name, status } = req.body
    try {
        let phpId = await categoryModel.findOne({}).select('php_id').sort({ php_id: -1 })
        let position = await categoryModel.findOne({}).select('position').sort({ position: -1 })
        position = position ? position.position + 1 : 1
        phpId = phpId ? phpId.php_id + 1 : 1
        console.log('position', phpId, position)
        if (name == "") {
            return res.json(await ResponseMsg.ResponseError(404, "Require all fiesk"))
        }
        const category = await categoryModel.create({
            php_id: phpId,
            name: name,
            position: position,
            status: status ? status : 1
        })
        if (category.length != 0) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", category))
        } else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}
const updateCategories = async (req, res) => {
    let { name, status, _id } = req.body
    console.log('status', status, name)
    try {
        if (name == "") {
            return res.json(await ResponseMsg.ResponseError(404, "Require all field"))
        }
        const category = await categoryModel.findByIdAndUpdate(_id, {
            name: name,
            status: status
        }, { new: true })
        if (category) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Update Successfully", category))
        } else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}

const deleteCategories = async (req, res) => {
    const { _id } = req.body
    try {
        const response = await categoryModel.findByIdAndDelete(_id)
        if (response) {
            return res.json(await ResponseMsg.ResponseSuccess(200, "Data Delete Successfully"))
        } else {
            return res.json(await ResponseMsg.ResponseError(404, "Data Not Found"))
        }
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message))
    }
}



const categoryUpdateStatus = async (req, res) => {
    try {
        var { _id, status } = req.body
        var Result = await categoryModel.findByIdAndUpdate({ _id: _id }, { status: status }, { new: true })
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

const categoryGetById = async (req, res) => {
    try {
        let { _id } = req.body
        const Result = await categoryModel.findById(_id)
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

const updatePosition = async (req, res) => {
    let { newOrder, pageInformation } = req.body;
    let ids = JSON.parse(newOrder);

    try {
        const dataOfArray = await categoryModel.find({}).sort({ position: 1 });
        const currentPage = Math.max(1, Math.floor(pageInformation.currentPage));
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const subsetOfData = dataOfArray.slice(startIndex, endIndex);

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const documentToUpdate = subsetOfData.find(doc => doc._id.toString() === id);
            if (documentToUpdate) {
                const newPosition = startIndex + i + 1;
                const r = await categoryModel.findByIdAndUpdate(id, { position: newPosition });
                console.log(`Document with ID ${id} updated successfully. New position: ${newPosition}`);
            }
        }
        return res.json(await ResponseMsg.ResponseSuccess(200, "Data Found Successfully", []));
    } catch (error) {
        return res.json(await ResponseMsg.CatchErrors(404, error.message));
    }
};
module.exports = { getCategories, createCategories, updateCategories, deleteCategories, categoryUpdateStatus, categoryGetById, updatePosition }