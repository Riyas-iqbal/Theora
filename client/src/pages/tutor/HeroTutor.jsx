import React, { useEffect, useRef } from 'react'
import Navbar from '../../components/tutor/Navbar'
import CarouselHero from '../../components/common/CarouselHero'
import TutorAdvantages from '../../components/tutor/TutorAdvantages'
import TopTutors from '../../components/tutor/TopTutors'
import TutorsReview from '../../components/tutor/TutorsReview'
import SectionTitle from '../../components/tutor/SectionTitle'
import HorizontalRule from '../../components/common/HorizontalRule'
import { Card } from 'flowbite-react'

function HeroTutor() {



    return (
        <>
            <Navbar />
            <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-200/95 pb-24">
                <CarouselHero />
                <hr className="h-px my-3 md:my-12 bg-gray-300 border-0 dark:bg-gray-700"></hr>

                <SectionTitle title='Course' description='Manage your course' />
                <HorizontalRule />

                <div className='flex justify-center'>
                    <Card className='max-w-2xl '>
                        <h5 className="mb-2 nexa-font text-3xl font-bold  text-amber-500 text-center dark:text-white">
                            Create a New Course
                        </h5>
                        <p className="mb-5 text-center text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                            Stay up to date and move work forward with Flowbite on iOS & Android. Download the app today.
                        </p>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <a
                                href="#"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2.5 text-black hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                            >

                                <div className="text-left">
                                    <div className="mb-1 text-xs">
                                        {/* Download  */}
                                    </div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        Create
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2.5 text-black hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                            >

                                <div className="text-left">
                                    <div className="mb-1 text-xs">
                                        {/* Get in  */}
                                    </div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        Manage Existing
                                    </div>
                                </div>
                            </a>
                        </div>
                    </Card>
                </div>

                <SectionTitle title='Tutors' description='Meet Our Star Tutors. Learn From the Best.' />
                <HorizontalRule />

                <div className='flex items-stretch gap-1 md:gap-5 flex-wrap md:flex-nowrap md:flex-row'>
                    <TopTutors className='flex-1' />
                    {/* <div className='flex-1'> */}
                    {/* <SectionTitle title='Testimonials' description='What Our Tutors Say About Theora' /> */}
                    <TutorsReview className='flex-1' />
                    {/* </div> */}
                </div>

                <TutorAdvantages />
            </div>
        </>
    )
}

export default HeroTutor