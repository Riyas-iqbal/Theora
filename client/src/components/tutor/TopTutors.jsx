import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopTutorsAPI } from '../../api/tutor'

function TopTutors() {

    const [tutors, setTutors] = useState([])

    useEffect(() => {
        getTopTutorsAPI()
            .then((response)=>{
                setTutors(response.data.data)
            })
    }, [])
    

    return (
        <>
            <div className="w-full max-w-xs m-4 sm:m-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4 p-5">
                    <h5 className="text-xl font-bold leading-none text-amber-400  dark:text-white nexa-font">Top Tutors</h5>
                    <Link to="tutors" className="text-sm font-medium text-amber-400 hover:underline dark:text-blue-500">
                        View all
                    </Link>
                </div>
                <div className="flow-root ">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            tutors.map((tutor,id) => (
                                <li key={id} className="p-5 py-3 sm:py-4 hover:bg-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {tutor.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {tutor.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {tutor?.totalViews}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopTutors