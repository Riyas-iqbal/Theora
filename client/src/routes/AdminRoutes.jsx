import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeroAdmin from'../pages/admin/HeroAdmin'
import '../pages/admin/satoshi.css'
import ManageUsers from '../pages/admin/ManageUsers'

function AdminRoutes() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HeroAdmin />} />
        <Route path='/users' element={<ManageUsers />} />
      </Routes>
    </>
  )
}

export default AdminRoutes