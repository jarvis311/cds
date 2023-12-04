import axios from "axios";

const CatchError = (error) => {
    return ({ Status: false, Response_Code: 404, Response_Message: error.message })
}

export const UserLogin = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('email', Data.Email)
        Form.append('password', Data.Password)
        const Result = await axios.post('/login', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LogoutApi = async () => {
    try {
        const Response = await axios.post('/logout')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const StampsAll = async (data) => {
    try {
        const Response = await axios.post('/stamps/all')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const StampsDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/stamps/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampIsPremium = async (ispremium, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('is_premium', ispremium)
        const Result = await axios.post('/stamps/ispremium/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampIsPremiumIos = async (ispremiumios, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('is_premium_ios', ispremiumios)
        const Result = await axios.post('/stamps/ispremiumios/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampStatus = async (status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', status)
        const Result = await axios.post('/stamps/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampStatusIos = async (statusios, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status_ios', statusios)
        const Result = await axios.post('/stamps/statusios/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/stamps/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const StampAdd = async (data) => {
    try {
        const Form = new FormData()
        Form.append('main_image', data.main_image)
        Form.append('zip_name', data.zip_name)
        Form.append('zip_name_ios', data.zip_name_ios)
        Form.append('is_premium', data.is_premium)
        Form.append('category_id', data.category_id)
        Form.append('is_premium_ios', data.is_premium_ios)
        Form.append('status', data.status)
        Form.append('status_ios', data.status_ios)
        const Result = await axios.post('/stamps/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const StampEdit = async (data, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('main_image', data.main_image)
        Form.append('zip_name', data.zip_name)
        Form.append('zip_name_ios', data.zip_name_ios)
        Form.append('is_premium', data.is_premium)
        Form.append('is_premium_ios', data.is_premium_ios)
        Form.append('status', data.status)
        Form.append('status_ios', data.status_ios)
        Form.append('category_id', data.category_id)

        const Result = await axios.post('/stamps/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const NewsAll = async (data) => {
    try {
        const Response = await axios.post('/news/all')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const NewsDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/news/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const NewsSearch = async (title) => {
    try {
        const Form = new FormData()
        Form.append('title', title)
        const Result = await axios.post('/news/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const NewsStatus = async (is_active, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('is_active', is_active)
        const Result = await axios.post('/news/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const NewView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/news/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const NewAdd = async (data, images) => {
    try {
        const Form = new FormData()
        Form.append('title', data.title)
        Form.append('header', data.header)
        Form.append('short_description', data.short_description)
        Form.append('description', data.description)
        Form.append('latitude', data.latitude)
        Form.append('longitude', data.longitude)
        Form.append('location_name', data.location_name)
        Form.append('is_active', data.is_active)

        images.map((val, index) => {
            Form.append('image', val)
        })

        const Result = await axios.post('/news/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const NewUpdate = async (id, data, addimages, deleteimages) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('title', data.title)
        Form.append('header', data.header)
        Form.append('short_description', data.short_description)
        Form.append('description', data.description)
        Form.append('latitude', data.latitude)
        Form.append('longitude', data.longitude)
        Form.append('location_name', data.location_name)
        Form.append('is_active', data.is_active)
        Form.append('deleteimage', JSON.stringify(deleteimages))

        addimages.map((val, index) => {
            Form.append('image', val)
        })

        const Result = await axios.post('/news/update', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const NewsWebViews = async (title) => {
    try {
        const Form = new FormData()
        Form.append('title', title)
        const Result = await axios.post('/destination/title', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const GetAllCategory = async (data) => {
    try {
        const Response = await axios.post('/category/get')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoryDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/category/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoryStatus = async (status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', status)
        const Result = await axios.post('/category/changestatus', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CreateCategory = async (data) => {
    try {
        const Form = new FormData()
        Form.append('name', data.name)
        Form.append('status', data.status)
        const Result = await axios.post('/category/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}
export const CategoryViewRecord = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/category/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}
export const CategoryUpdateRecord = async (data, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('name', data.name)
        Form.append('status', data.status)
        const Result = await axios.post('/category/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}
export const CategoryUpdatePostion = async (data, pageInformation) => {
    try {
        // const Form = new FormData()
        // Form.append('newOrder', JSON.stringify(data))
        // Form.append('pageInformation', pageInformation)
        // console.log('first', )
        const Result = await axios.post('/category/position', { newOrder: JSON.stringify(data), pageInformation: pageInformation })
        return Result
    } catch (error) {
        return CatchError(error)
    }
}
export const StampUpdatePostion = async (data, pageInformation) => {
    try {
        // const Form = new FormData()
        // Form.append('newOrder', JSON.stringify(data))
        // console.log('first', )
        const Result = await axios.post('/stamps/position/update', { newOrder: JSON.stringify(data), pageInformation: pageInformation })
        return Result
    } catch (error) {
        return CatchError(error)
    }
}