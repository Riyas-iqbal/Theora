import API from ".";

const createCourseAPI = (body, route = `/tutor/courses/create`) => {
    return API.post(
        route,
        body,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )
}


export {
    createCourseAPI
}