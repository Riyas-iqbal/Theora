import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseDetailsAPI } from '../../api/tutor'
import SectionTitle from '../../components/tutor/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import Loading from '../../components/common/Loading'

function UpdateCourse() {

  const { id } = useParams()

  const [course, setCourse] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCourseDetailsAPI(id)
      .then((response) => {
        const course = response.data?.data
        console.log(course)
        setCourse(course)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      })
  }, [])

  return (
    <>
      {
        isLoading ?
          <Loading />
          :
          <>
            <SectionTitle title={course?.title} description={`Providing theora course management tool - Manage your ${course?.title} course`} />
            <HorizontalRule />
            <h1>tagline - {course?.tagline}</h1>
            <h1>Description - {course?.about}</h1>

            <img src={course?.thumbnailURL} alt="alternate image" />

          </>
      }
    </>
  )
}

export default UpdateCourse