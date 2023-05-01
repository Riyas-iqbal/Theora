import React from 'react'
import SectionTitle from './SectionTitle'
import HorizontalRule from '../common/HorizontalRule'
import CourseCard from './CourseCard'

function TrendingCourse() {
  return (
    <>
    <SectionTitle title='Treding Course' description='View the trending courses in Theora' />
    <HorizontalRule />

    <CourseCard />
    </>
  )
}

export default TrendingCourse