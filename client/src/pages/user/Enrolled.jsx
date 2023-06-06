import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../../components/user/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import { getUserEnrolledCoursesAPI } from '../../api/user'
import Loading from '../../components/common/Loading'
import { Badge } from 'flowbite-react'

export default function Enrolled() {

	const [courses, setCourses] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getUserEnrolledCoursesAPI()
			.then((response) => {
				setCourses(response.data.data)
				setTimeout(() => setIsLoading(false), 1000)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<SectionTitle title='Enrolled Courses' description='Courses enrolled by you. Happy Learning!' />
			<HorizontalRule />
			<div className='grid grid-cols-4 justify-center mr-10 gap-1'>
				{
					isLoading ?
						<Loading />
						:
						courses.length ?
							courses.map((course) => (
								<div
									key={course._id}
									// style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
									className="max-w-sm block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-10">
									<div className='overflow-hidden '>
										<Link to={`/courses/enrolled/${course._id}`}>
											<img className="rounded-t-lg duration-300 scale-105 min-h-[11rem] object-cover hover:scale-100" src={course.thumbnailURL} alt="product image" />
										</Link>
									</div>
									<div className="px-5 pb-5">
										<Link to="#">
											<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white pt-4 nexa-font">{course.title}</h5>
											<span className="text-sm font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">{course.tagline}</span>
										</Link>
										<div className='py-4'>
											<Badge color="info" className='w-fit'>
												{console.log(course)}
												{course.category}
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
										<div className="flex items-center justify-between">
											<div className="flex flex-col items-start justify-start">
												<span className="text-sm font-bold text-red-700 line-through dark:text-white">₹{course.price}</span>
												<span className="text-2xl font-bold text-gray-900 dark:text-white">₹{course.price}</span>
											</div>
											<Link to={`/courses/enrolled/${course._id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Learning</Link>
										</div>
									</div>
								</div>
							))
							:
							<div className="flex justify-center items-center h-100">
								<h1 className='nexa-font '>You havent enrolled in any courses</h1>
							</div>
				}
			</div>
		</>

	)
}
