import React, { useEffect } from 'react'
import SectionTitle from '../../components/user/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import { Link, useParams } from 'react-router-dom'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { getCourseDetailsAPI } from '../../api/user'
import { useState } from 'react'
import Loading from '../../components/common/Loading'


export default function Course() {
	const [course, setCourse] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	const params = useParams()

	useEffect(() => {
		(async () => {
			const courseDetails = await getCourseDetailsAPI(params.id)
			setCourse(courseDetails.data.data)
			setTimeout(()=>setIsLoading(false),1000)
		})()
	}, [])



	return (
		<>
			{
				isLoading ?
					<Loading />
					:
					<div className="flex mt-10 nexa-font">
						
						{/* Left Course details section  */}
						<div className="w-3/5 m-3">
							<SectionTitle title='Course Overview' description='get an overview of the course here' />
							<HorizontalRule />
							<div className="flex justify-around px-20 mt-10 bg-gray-50 p-10">
								<div className='flex justify-center items-center '>
									<span className='text-xl text-center px-4 text-gray-400'>
										Instructor
										<hr />
										<h1 className='text-xl  text-amber-500'>{course?.tutor?.name}</h1>
									</span>
									<img
										className='rounded-full w-20'
										src="https://secure.gravatar.com/avatar/c98bb1db01e83b0183281b6aa6173647?s=250&d=mm&r=g"
										alt="profile picture"
									/>
								</div>
								<div className='flex flex-row-reverse justify-center items-center '>
									<div className='text-xl text-center px-4 text-gray-400'>
										Category
										<hr />
										<span className='text-xl  text-amber-500'>{course?.category || 'programming'}</span>
									</div>
									<CodeBracketIcon className='w-10' />

								</div>
							</div>
						</div>


						{/* Right Payment section  */}
						<div className="w-2/5 m-3">
							<SectionTitle title='Price' description='This is a paid course' />
							<HorizontalRule />

							<div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
								<div className="mx-auto max-w-xs px-8">
									<p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
									<p className="mt-6 flex items-baseline justify-center gap-x-2">
										{console.log(course)}
										<span className="text-5xl font-bold tracking-tight text-gray-900">₹{course?.price}</span>
										<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">INR</span>
									</p>
									<Link
										to="/course/get/"
										className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Get access
									</Link>
									<p className="mt-6 text-xs leading-5 text-gray-600">
										Invoices and receipts available for easy company reimbursement
									</p>
								</div>
							</div>
						</div>
					</div>
			}
		</>
	)
}
