import React from 'react'
import DefaultLayout from '../../components/admin/DefaultLayout'
import CardOne from '../../components/admin/CardOne'
import CardTwo from '../../components/admin/CardTwo'
import CardThree from '../../components/admin/CardThree'
import CardFour from '../../components/admin/CardFour'
import ChartOne from '../../components/admin/ChartOne'
import ChartTwo from '../../components/admin/ChartTwo'
// import ChartThree from '../../components/admin/ChartThree'
// import MapOne from '../../components/admin/MapOne'

function HeroAdmin() {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName={'Dashboard'} /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
      </div>
    </DefaultLayout>
  )
}

export default HeroAdmin