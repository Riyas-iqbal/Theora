import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseDetailsAPI } from '../../api/tutor'
import SectionTitle from '../../components/tutor/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import Loading from '../../components/common/Loading'
import CreateLesson from '../../components/tutor/CreateLessonModal'
import { Badge } from 'flowbite-react'

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
            <div className="flex nexa-font p-3">

              <div className='flex-1 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                <img src={course?.thumbnailURL} className='w-125 card ml-10 rounded' alt="alternate image" />
                <div className='mt-5 ml-10 flex gap-3 justify-start'>
                  <Badge color="info" className='w-fit capitalize'>
                    {course.category}
                  </Badge>
                  <Badge color='warning' className='w-fit capitalize' >
                    {course.difficulty}
                  </Badge>
                </div>
                <h1 className='text-amber-500 text-3xl p-5'>{course.title}</h1>
                <h3 className=''>{course?.tagline}</h3>
                <h3 className='mt-5'>Description - {course?.about}</h3>
              </div>

              <div className='flex-1 p-10'>
                <img src="" alt="" />
                <div className='flex justify-center'>
                  <CreateLesson course={course} />
                </div>

                {/* upload file*/}
                {/* <div className="flex items-center justify-center w-full mb-5">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Upload your video (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div> */}

                {/* Lessons  */}
                {course.lessons.length ?
                  <>
                    <h1 className='text-amber-500 drop-shadow-sm nexa-font text-start  text-xl  md:text-1xl ml-3 mt-10 mb-10 font-black'>View Lessons</h1>
                  </>
                  :
                  null
                }
                <div className={`flex  ${course.lessons.length ? "justify-center " : ""} flex-col gap-3 items-center h-30 mb-5`}>

                  {/* <HorizontalRule /> */}
                  {
                    course?.lessons.length
                      ?
                      course.lessons.map((lesson, index) => (
                        <Link key={lesson._id} className='flex justify-between items-center min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                          <div className="rounded">
                            <div>
                              <span className='text-red-300 mr-2'>{index + 1}</span><span> - {lesson.title}</span>
                            </div>
                            {/* <h6 className='text-sm'>{lesson.description}</h6> */}
                          </div>
                          <div className=''>
                            <span>10:00</span>
                          </div>
                        </Link>
                      ))
                      :
                      <div className='text-red-500 flex flex-col items-center gap-8  justify-center'>
                        <div className='mt-10'>
                          'No lessons created for this course'
                        </div>
                        <div>
                          <img className='w-132.5' src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000" alt="" />
                        </div>
                      </div>
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