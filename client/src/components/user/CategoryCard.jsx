import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HorizontalRule from '../common/HorizontalRule'
import { useEffect } from 'react'

function CategoryCard({ categories }) {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 2000);
  }, [])
  

  return (
    <>
      <h1 className='text-blue-700 nexa-font text-start ml-16 text-4xl pt-10 font-black'>Category</h1>
      <HorizontalRule />

      <div className="flex flex-wrap justify-center gap-6">

        { //change key from index to category id
          categories.map((category, i) => (

            <Link to={`/category/${i}`} key={i}
              className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
              transition ease-in-out hover:scale-105 duration-300"
            >
              <div className="flex flex-col gap-3 items-center justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
                <h6 className="text-2xl font-bold tracking-tight text-blue-500 nexa-font dark:text-white">{category.title}</h6>
                <p className="font-normal text-gray-700 nexa-font dark:text-gray-400">{category.description}</p>
              </div>
            </Link>
          )
          )
        }



      </div>
    </>
  )
}

export default CategoryCard