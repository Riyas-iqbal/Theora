import React, { useEffect } from 'react'
import CourseCard from '../../components/tutor/CourseCard'
import { getAllCoursesByTutorAPI } from '../../api/admin'
import { useState } from 'react'
import SectionTitle from '../../components/tutor/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'

function ManageCourses() {

    const [courses, setCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAllCoursesByTutorAPI()
            .then((response) => {
                console.log(response.data)
                setCourses(response.data?.data)
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <SectionTitle title='Courses created by you' description='Share the knowledge with the world!' />
            <HorizontalRule />
            <div className='px-4 md:px-20 pb-10 md:pb-20  md:pt-6 nexa-font'>
                <CourseCard courses={courses} loading={isLoading}/>
            </div>
        </>
    )
}

export default ManageCourses