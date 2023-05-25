import API from "./index";

const getAllCoursesByTutorAPI =  (route = '/tutor/courses') => {
    return API.get(route)
}

const getAllUsersAPI = (route='/admin/users')=>{
    return API.get(route)
}

export {
    getAllCoursesByTutorAPI,
    getAllUsersAPI
}