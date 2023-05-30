import API from "./index";

const getAllCoursesByTutorAPI = (route = '/tutor/courses') => {
    return API.get(route)
}

const getAllUsersAPI = (route = '/admin/users') => {
    return API.get(route)
}


/**
 * 
 * @param {*} body req body that containes the name and description of the category 
 * @param {*} route Api route to call
 * @returns promise 
 */
const createCourseAPI = (body, route = '/admin/category') => {
    return API.post(
        route,
        body
    )
}

export {
    getAllCoursesByTutorAPI,
    getAllUsersAPI,
    createCourseAPI
}