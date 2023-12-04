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

export const CategoriesAll = async (data) => {
    try {
        const Response = await axios.post('/categories/all')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoriesDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/categories/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoriesStatus = async (status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', status)
        const Result = await axios.post('/categories/status', Form)
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
        const Result = await axios.post('/Categories/ispremiumios/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const Categoriestatus = async (status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', status)
        const Result = await axios.post('/Categories/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoriestatusIos = async (statusios, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status_ios', statusios)
        const Result = await axios.post('/Categories/statusios/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const Categoriesview = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/categories/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const Categoriesadds = async (data) => {
    try {
        console.log(data)
        const Form = new FormData()
        Form.append('name', data.name)
        Form.append('image', data.image)
        Form.append('status', data.status)
        const Result = await axios.post('/categories/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const Categoriesedit = async (data, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('name', data.name)
        Form.append('image', data.image)
        Form.append('status', data.status)
        const Result = await axios.post('/categories/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoriesId = async () => {
    try {
        const Response = await axios.post('/categories/getallid')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsAll = async (data) => {
    try {
        const Response = await axios.post('/reels/all')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/reels/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategoriesSearch = async (name) => {
    try {
        const Form = new FormData()
        Form.append('name', name)
        const Result = await axios.post('/categories/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsStatus = async (status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', status)
        const Result = await axios.post('/reels/status', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsViews = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/reels/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}


export const ReelsEdits = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/reels/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsAdds = async (data) => {
    try {
        const Form = new FormData()
        Form.append('categories_id', data.categories_id)
        Form.append('sound_name', data.sound_name)
        Form.append('video', data.video)
        Form.append('status', data.status)

        const Result = await axios.post('/reels/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsUpdate = async (data, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('categories_id', data.categories_id)
        Form.append('sound_name', data.sound_name)
        Form.append('video', data.video)
        Form.append('status', data.status)

        const Result = await axios.post('/reels/update', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const ReelsSearch = async (name) => {
    try {
        const Form = new FormData()
        Form.append('name', name)
        const Result = await axios.post('/reels/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}


export const GetAllCelbrityVoice = async (data) => {
    try {
        const Response = await axios.post('/celebrity-voice/get')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const AddCelbrityVoice = async (data) => {
    try {
        console.log(data)
        const Form = new FormData()
        Form.append('name', data.name)
        Form.append('thumb_image_url', data.thumb_image_url)
        Form.append('premium_status', data.premium_status)
        Form.append('reward_status', data.reward_status)
        Form.append('status', data.status)
        const Result = await axios.post('/celebrity-voice/add', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const CelbrityVoiceview = async (id) => {
    try {
        const Result = await axios.post('/celebrity-voice/view', {_id:id})
        return Result
    } catch (error) {
        return CatchError(error)
    }
}