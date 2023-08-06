import API from './index'

const getAllCoursesAPI = () => {
    return API.get('/user/courses')
}

const getAllCourseByQuery = (query) => {
    return API.get(`user/courses?${query}`)
}

const getLessonDetailsAPI = (lessonId) => {
    return API.get(`/user/lessons/${lessonId}`)
}

const getAllCategoriesAPI = (route = '/admin/category') => {
    return API.get(route)
}

const verifyGoogleSignIn = (token)=>{
    return API.post('/auth/signin/google/verify',{
        token: token
    })
}


export {
    getAllCoursesAPI,
    getLessonDetailsAPI,
    getAllCourseByQuery,
    getAllCategoriesAPI,
    verifyGoogleSignIn
}