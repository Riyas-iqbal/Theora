// import React from 'react'
import { useEffect, useState } from "react"
import CarouselHero from "../../components/common/CarouselHero"
import TopBanner from "../../components/common/TopBanner"
import Navbar from "../../components/user/Navbar"
import { Link } from 'react-router-dom'

function HeroUser() {
  const LinkTitle = "Namaste React";
  const promotion = "From the person who made javascript easy as possible introducing"

  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true)
    }, 3000);
  }, [])

  return (
    <>
      <div
        style={{
          opacity: showComponent ? 1 : 0,
          top: showComponent ? 0 : '-50px',
          left: 0,
          position: 'absolute',
          transition: 'opacity 1s, top 1s',
          width: '100vw'
        }}>
        <TopBanner LinkTitle={LinkTitle} promotion={promotion} />
      </div>


      <Navbar />

      <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-200/95">
        <CarouselHero />
      </div>
    </>
  )
}

export default HeroUser