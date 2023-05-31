import { PhotoIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

import SectionTitle from '../../components/tutor/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import { courseSchema } from '../../utils/validation'
import { createCourseAPI } from '../../api/tutor';
import { getAllCategoriesAPI } from '../../api/common';

export default function CreateCourse() {
  const [categories, setCategories] = useState([])
  const [imageError, setImageError] = useState(null)

  const navigate = useNavigate()
  const [imagePreviewURL, setImagePreviewURL] = useState(null)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(courseSchema),
  });


  useEffect(() => {
    getAllCategoriesAPI()
      .then(({ data }) => {
        setCategories(data.categories)
      })
  }, [])


  const validateImage = (file) => {
    setImagePreviewURL(null)

    // Check if the file is an image
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Invalid file type')
      console.log('invalid file type')
      return false;
    }

    // Check if the file size is within the limit
    const maxSize = 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      setImageError('file size exceeds limit of 1MB')
      console.log('file size exceeds limit of 1MB')
      return false;
    }

    setImageError(null)
    // If all checks pass, return valid as true
    return true;
  }

  //thumbnail preview
  useEffect(() => {
    let fileReader;
    if (watch('thumbnail')[0] && validateImage(watch('thumbnail')[0])) {
      if (watch('thumbnail')[0]) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target
          if (result) setImagePreviewURL(result)
        }
        fileReader.readAsDataURL(watch('thumbnail')[0]);
      }
      return () => {
        if (fileReader && fileReader.readyState === 1) {
          console.log('aborted')
          fileReader.abort();
        }
      }
    }
  }, [watch('thumbnail')])


  const onSubmit = async (data, e) => {
    if (imageError) {
      console.log('please upload correct thumnail')
      return false
    }
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("tagline", data.tagline);
    formData.append("about", data.about);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("difficulty", data.difficulty);
    formData.append("thumbnail", Array.from(data.thumbnail)[0])

    createCourseAPI(formData)
      .then((response) => {
        reset()
        console.log(response)
        if (confirm('Course created successfully')) {
          console.log('yes')
          navigate('/tutor')
        } else {
          console.log('no')
        }
      })
      .catch((error) => {
        console.log(error)
        alert('error occurred while creating course ' + error.message)
        // navigate('../')
      })
  }

  return (
    <>
      <SectionTitle title='Create a New Course' description='Share the knowledge with the world!' />
      <HorizontalRule />
      <div className='px-4 md:px-20 pb-10 md:pb-20  md:pt-6 nexa-font'>

        <div className="flex flex-col-reverse lg:flex-row">

          <div className="lg:w-1/2">

            {/* course create form */}
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Craft Compelling Courses</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Design, Engage, and Inspire with Theora's Intuitive Course Creation Toolkit
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-4">
                      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Course title
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md  ${errors.title?.message && 'ring-red-600 ring-1 rounded-md'} `}>
                          {/* <span className="flex select-none items-center  pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                          <input
                            type="text"
                            name="title"
                            id="title"
                            {...register("title")}
                            className={`block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 `}
                            placeholder="title"
                          />
                        </div>
                        <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.title?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="tagline" className="block text-sm font-medium leading-6 text-gray-900">
                        Tag line
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${errors.tagline?.message && 'ring-red-600 ring-1 rounded-md'}`}>
                          {/* <span className="flex select-none items-center  pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                          <input
                            type="text"
                            name="tagline"
                            id="tagline"
                            {...register("tagline")}
                            autoComplete="tagline"
                            className="block nexa-font flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="tagline"
                          />
                        </div>
                        <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.tagline?.message}</p>
                      </div>
                    </div>

                    <div className='sm:col-span-6 flex'>
                    <div className="w-full">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Catgegory</label>
                      <div className="mt-2">
                        <select
                          id="country" 
                          className="bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register('category')}
                        >
                          {
                            categories.map((category) => (
                              <option key={category._id}>{category.title}</option>
                            ))
                          }

                        </select>
                        <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.category?.message}</p>
                      </div>
                    </div>

                    <div className="w-full">
                      <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900">Difficulty</label>
                      <div className="mt-2">
                        <select
                          id="difficulty"
                          className="bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register('difficulty')}
                        > 
                          <option className='capitalize'>beginner</option>
                          <option className='capitalize'>intermediate</option>
                          <option className='capitalize'>advanced</option>
                          <option className='capitalize'>expert</option>
                        </select>
                        <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.difficulty?.message}</p>
                      </div>
                    </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Price
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${errors.price?.message && 'ring-red-600 ring-1 rounded-md'} `}>
                          {/* <span className="flex select-none items-center  pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                          <input
                            type="number"
                            name="price"
                            id="price"
                            {...register("price")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="price"
                          />
                        </div>
                        <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.price?.message}</p>

                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          {...register("about")}
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-inset 
                          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                          sm:text-sm sm:leading-6 ${errors.about?.message && 'ring-red-600 ring-1 rounded-md'}`}
                          defaultValue={''}
                        />
                      </div>
                      <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.about?.message}</p>

                      {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a description for your course should contain atleast 40 words</p> */}
                      {/* <h3 className='text-red-600'>{error}</h3> */}
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2
                               focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>

                              <input
                                id="file-upload"
                                name="file-upload"
                                {...register("thumbnail")}
                                required
                                type="file"
                                className="sr-only"
                              />

                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 1MB</p>
                        </div>
                      </div>
                      <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.thumbnail?.message}</p>
                      <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{imageError}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 flex items-center justify-center gap-x-6">
                {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button> */}
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* course create form end */}

          </div>

          {/* course preview section */}
          <div className="lg:w-1/2 mb-10 lg:mb-1 flex  justify-center">
            <div>
              <SectionTitle title='Course preview' description='This is how your course will look like' />
              <div
                style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
                className="w-full max-w-sm block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-10">
                <div className='overflow-hidden '>
                  <Link to="#">
                    <img
                      className="rounded-t-lg duration-300 scale-105 hover:scale-100"
                      style={{ minHeight: '286px', objectFit: 'cover' }}
                      src={imagePreviewURL ? imagePreviewURL : "https://archive.org/download/no-photo-available/no-photo-available.png"}
                      alt="course thumbnail"
                    />
                  </Link>
                </div>

                <div className="px-5 pb-5">
                  <Link to="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white pt-4 nexa-font">
                      {/* {title ? title : 'Attractive Title'} */}
                      {watch('title') ? watch('title') : 'Attractive Title'}
                    </h5>

                    <h5 className="text-sm font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">
                      {watch('tagline') ? watch('tagline') : 'A catchy tagline for your course'}
                    </h5>
                  </Link>

                  <div className="flex items-center mt-2.5 mb-5">
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-start">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{watch('price') ? watch('price') : '0'}
                      </span>
                    </div>
                    <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Buy course
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

