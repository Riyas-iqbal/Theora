// import React from 'react'
import React, { useEffect, useState } from "react"
import CarouselHero from "../../components/common/CarouselHero"
import TopBanner from "../../components/common/TopBanner"
import Navbar from "../../components/user/Navbar"
import { Link } from 'react-router-dom'
import Footer from "../../components/user/FooterUser"
import TabSection from "../../components/user/TabSection"
import CategoryCard from "../../components/user/CategoryCard"

function HeroUser() {
  const LinkTitle = "Namaste React";
  const promotion = "From the person who made javascript easy as possible introducing"

  const categories = [
    {
      title: 'Computer Programming',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Data Science',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Machine Learning',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Backend engineering',
      description: 'Learn everything about programming from fundametals to advanced topics',
    },{
      title: 'Computer Programming',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Data Science',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Machine Learning',
      description: 'Learn everything about programming from fundametals to advanced topics',
    }, {
      title: 'Backend engineering',
      description: 'Learn everything about programming from fundametals to advanced topics',
    },
  ]

  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true)
    }, 3000);
  }, [])

  return (
    <>
      {/* <TopBanner LinkTitle={LinkTitle} promotion={promotion} showComponent={showComponent} /> */}

      <Navbar />

      <div className="pt-10 px-1 md:px-10 sm:px-5 bg-gray-200/95">
        <CarouselHero />

        <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>

        <CategoryCard categories={categories} />

        <TabSection />

        <section className="h-screen">
        </section>


      </div>
      <Footer />
    </>
  )
}

export default HeroUser