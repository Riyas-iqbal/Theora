import API from './index'

const getAllCoursesAPI = () => {
    return API.get('/user/courses')
}

export {
    getAllCoursesAPI
}