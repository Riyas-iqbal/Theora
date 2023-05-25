import API from './index'

const getAllCoursesAPI = () => {
    return API.get('/user/courses')
}

const getLessonDetailsAPI = (lessonId) => {
    return API.get(`/user/lessons/${lessonId}`)
}
export {
    getAllCoursesAPI,
    getLessonDetailsAPI
}