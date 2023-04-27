// import React from 'react'
import CarouselHero from "../../components/common/CarouselHero"
import TopBanner from "../../components/common/TopBanner"
import Navbar from "../../components/user/Navbar"
import { Link } from 'react-router-dom'

function HeroUser() {

  return (
    <>
      <TopBanner LinkTitle="Namaste React" promotion="From the person who made javascript easy as possible introducing"/>
      <Navbar />
      {/* <hr className="h-px py-3 gray-50 border-0 dark:bg-gray-700" /> */}
      <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-200/95">
        {/* <div className="w-screen"> */}
        {/* <div className="bg-gray-200"> */}
          <CarouselHero />
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default HeroUser