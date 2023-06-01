import API from ".";

const createCourseAPI = (body, route = `/tutor/courses/create`) => {
    return API.post(
        route,
        body,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )
}

const getCourseDetailsAPI = (id, route = '/tutor/courses/') => {
    return API.get(route + id)
}

const getTopTutorsAPI = async (route='/tutor/details/top') => {
    return API.get(route) 
}

const createLessonAPI = (body, route = `/tutor/lessons`) => {
    return API.post(
        route,
        body,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )
}

const handleLogOutAPI = (route='/auth/tutor/logout') => {
    return API.delete(route)
}


export {
    createCourseAPI,
    getCourseDetailsAPI,
    createLessonAPI,
    getTopTutorsAPI,
    handleLogOutAPI
}