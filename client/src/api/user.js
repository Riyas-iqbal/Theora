import API from "./index";

const getCourseDetailsAPI = (id, route = '/user/courses/enroll/') => {
    return API.get(route + id)
}

const enrollCourseAPI = (body) => {
    return API.post(
        '/user/courses/enroll',
        body
    )
}

const createOrderAPI = (courseId) => {
    return API.post(
        '/user/orders/create',
        {
            courseId
        }
    )
}

const verifyPaymentAPI = (data) => {
    return API.post(
        '/user/orders/payment/verify',
        data
    )
}

const isEnrolledInCourseAPI = (courseId) => {
    return API.get(`/user/details/enrolled/${courseId}/check`)
}

const getUserEnrolledCoursesAPI = () => {
    return API.get('/user/courses/enroll')
}

const handleLogOutAPI = () => {
    return API.delete('/auth/logout')
}

export {
    getCourseDetailsAPI,
    getUserEnrolledCoursesAPI,
    isEnrolledInCourseAPI,
    enrollCourseAPI,
    handleLogOutAPI,
    createOrderAPI,
    verifyPaymentAPI
}