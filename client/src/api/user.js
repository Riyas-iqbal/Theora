import API from "./index";

const getCourseDetailsAPI = (id, route = '/user/courses/') => {
    return API.get(route + id)
}

const enrollCourseAPI = (body) => {
    return API.post(
        '/user/courses/enroll',
        body
    )
}

export {
    getCourseDetailsAPI,
    enrollCourseAPI
}