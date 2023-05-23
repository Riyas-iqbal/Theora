import API from "./index";

const getCourseDetailsAPI = (id, route = '/user/courses/') => {
    return API.get(route + id)
}


export {
    getCourseDetailsAPI
}