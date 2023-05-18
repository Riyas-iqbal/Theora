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
            <div className="flex nexa-font">

              <div className='flex-1 p-10'>
                <img src={course?.thumbnailURL} className='w-125 card ml-10 rounded' alt="alternate image" />
                <h1 className='text-amber-500 text-3xl p-5'>{course.title}</h1>
                <h3 className=''>{course?.tagline}</h3>
                <h3 className='mt-5'>Description - {course?.about}</h3>
              </div>

              <div className='flex-1 p-10'>

                {/* upload file*/}
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Upload your video (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                
                {/* Lessons  */}
                <div className='text-red-500 flex justify-center items-center h-30 mb-5'>
                  <HorizontalRule />
                  {
                    course?.lessons.length
                      ?
                      course.lessons.map((lesson)=>{
                        <>
                          {lesson}
                        </>
                      })
                      :
                      'No lessons created for this course'
                  }
                </div>
              
              </div>
            </div>

          </>
      }
    </>
  )
}

export default UpdateCourse