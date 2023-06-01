import React, { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { PhotoIcon, UserCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { createLessonAPI } from '../../api/tutor'
import '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { lessonSchema } from '../../utils/validation'
import { useNavigate } from 'react-router-dom'
export default function createLessonModal({ course }) {
	const [isOpen, setIsOpen] = useState(false)
	const [error, setError] = useState(null)
	const [fileName, setFileName] = useState(null)
	const navigate = useNavigate()

	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(lessonSchema),
	});
	const formData = new FormData();

	const handleFileSelect = async (e) => {
		console.log(e.target.files[0])
		setError(null)
		const fileSizeInBytes = e.target.files[0].size;
		const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
		if (fileSizeInMB > 30) {
			return setError('file size exceeded 30 MB')
		}
		setFileName(e.target.files[0].name)
	}

	const removeSelectedFile = async () => {
		setFileName(null)
	}

	const onSubmit = (data) => {
		if (error) {
			console.log(error)
			return false
		}
		if (!Array.from(data.video).length || !fileName) {
			setError('No video files were selected')
			return false
		}
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("lesson", Array.from(data.video)[0])
		formData.append("courseId", course._id)

		createLessonAPI(formData)
			.then(response => {
				setIsOpen(!open)
				navigate(`/tutor/courses/${course._id}`)
				console.log(response)
			})
			.catch(error => console.log(error))
	}


	return (
		<React.Fragment>
			<Button onClick={() => setIsOpen(!isOpen)} color="warning">
				Add New Lesson
			</Button>
			<Modal
				dismissible={true}
				show={isOpen}
				onClose={() => setIsOpen(!isOpen)}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Header >
						<span className='text-amber-500 nexa-font'>{course.title} - Add New Lesson</span>
					</Modal.Header>
					<Modal.Body>

						<div className="space-y-12">
							<div className="border-b border-gray-900/10 pb-12">
								<h2 className="text-base font-semibold leading-7 text-gray-900">Lesson No - {course.lessons.length + 1}</h2>
								<p className="mt-1 text-sm leading-6 text-gray-600">
									This information will be displayed publicly so be careful what you share.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-full">
										<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
											Title
										</label>
										<div className="mt-2">
											<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-">
												<input
													type="text"
													{...register('title')}
													id="username"
													autoComplete="username"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="lesson title"
												/>
											</div>
											<p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.title?.message}</p>
										</div>
									</div>

									<div className="col-span-full">
										<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
											Description
										</label>
										<div className="mt-2">
											<textarea
												id="about"
												name="about"
												rows={3}
												{...register('description')}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												defaultValue={''}
											/>
										</div>
										<p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.description?.message}</p>
										<p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this lesson.</p>
									</div>

									{/* <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div> */}

									<div className="col-span-full">
										{
											!fileName && (
												<>
													<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
														Video File
													</label>
													<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
														<div className="text-center">
															<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
															<div className="mt-4 flex text-sm leading-6 text-gray-600">
																<label
																	htmlFor="file-upload"
																	className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
																>
																	<span>Upload a Video</span>

																	<input
																		id="file-upload"
																		name="file-upload"
																		type="file"
																		accept='video/*'
																		{...register('video', { onChange: handleFileSelect })}
																		className="sr-only"
																	/>

																</label>
																<p className="pl-1">or drag and drop</p>
															</div>
															<p className="text-xs leading-5 text-gray-600">MP4, HEIC,MOV up to 30MB</p>
														</div>
														{errors.video && errors.video.message}
													</div>
												</>
											)
										}

										<span className='text-red-600'>{error}</span>
										{
											fileName && (
												<div className='flex justify-between items-center bg-indigo-100 rounded-md mt-3 hover:bg-indigo-50'>
													<div className='nexa-font ml-3 p-2'>{fileName}</div>
													<div>
														<XCircleIcon className='w-6 mr-2 hover:cursor-pointer hover:text-red-300 hover:rotate-90 duration-200' onClick={removeSelectedFile} />
													</div>
												</div>
											)
										}
									</div>
								</div>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer className='flex justify-end'>
						<Button type='submit' onClick={() => {
							if (!error && !errors) {
								setIsOpen(!isOpen)
							}
						}
						}>
							Create Lesson
						</Button>
						<Button
							color="gray"
							onClick={() => setIsOpen(!isOpen)}
						>
							Go back
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</React.Fragment>
	)
}

