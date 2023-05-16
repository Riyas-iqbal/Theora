import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeroAdmin from'../pages/admin/HeroAdmin'
import '../pages/admin/satoshi.css'


function AdminRoutes() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HeroAdmin />} />
      </Routes>
    </>
  )
}

export default AdminRoutes