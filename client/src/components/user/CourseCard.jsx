import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCoursesAPI } from '../../api/common'
import { Badge } from 'flowbite-react'
import timeAgo from '../../utils/timeAgo'

function CourseCard() {
	const [courses, setCourses] = useState([])

	useEffect(() => {
		(async () => {
			getAllCoursesAPI()
				.then((response) => {
					setCourses(response.data.data)
				})
				.catch((error) => {
					console.log(error)
				})
		})()
	}, [])


	return (
		<>
			<div className='flex hide-scroll-bar pb-3' style={{ scrollSnapType: 'x-mandatory', overflow: 'auto' }}>
				{
					courses.map(course => (
						<div
							key={course._id}
							style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
							className="w-full max-w-70 block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5">
							<div className='overflow-hidden'>
								<Link to={`/courses/${course._id}`}>
									<img className="rounded-t-lg duration-300 scale-105 hover:scale-100 min-h-[12rem] object-cover aspect-video" src={course.thumbnailURL} alt="product image" />
								</Link>
							</div>
							<div className="px-5 pb-3 nexa-font">
								<Link to={`/courses/${course._id}`}>
									<h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white pt-4 nexa-font">{course.title}</h5>
									<h5 className="text-xs font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">{course.tagline}</h5>
								</Link>
								<div className='py-4 flex justify-between '>
									<Badge color="info" className='w-fit capitalize'>
										{course.category}
									</Badge>
									<Badge color="danger" className='capitalize'>
										{timeAgo(course.createdAt)}
									</Badge>
								</div>
								{/* <div className="flex items-center mt-2.5 mb-5">
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
									<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
								</div> */}
								<div className="flex items-center justify-between ">
									<div className="flex flex-col items-start justify-start">
										{/* <span className="text-sm font-bold text-red-700 line-through dark:text-white">₹{course.price}</span> */}
										<span className="text-2xl font-bold text-gray-900 dark:text-white nexa-font">₹{course.price}</span>
									</div>
									<Link to={`/courses/${course._id}`}
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Enroll
									</Link>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</>
	)
}

export default CourseCard