import React from 'react'
import { Link } from 'react-router-dom'

function TopTutors() {
    return (
        <>
            <div className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-amber-400  dark:text-white nexa-font">Top Tutors</h5>
                    <Link to="tutors" className="text-sm font-medium text-amber-400 hover:underline dark:text-blue-500">
                        View all
                    </Link>
                </div>
                <div className="flow-root ">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    1M+
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Bonnie Green
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    956K
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Michael Gough
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    800k
                                </div>

                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Lana image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Lana Byrd
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    649k
                                </div>
                            </div>
                        </li>
                        <li className="pt-3 pb-0 sm:pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="http://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Thomes Lean
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    458k
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopTutors