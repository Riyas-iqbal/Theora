import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeroAdmin from '../pages/admin/HeroAdmin'
import '../pages/admin/satoshi.css'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageTutors from '../pages/admin/ManageTutors'
import ManageCategory from '../pages/admin/ManageCategory'
import { Toaster } from 'react-hot-toast'

function AdminRoutes() {

  return (
    <>
      <div><Toaster position="bottom-center" reverseOrder={true} /></div>
      <Routes>
        <Route path='/' element={<HeroAdmin />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/tutors' element={<ManageTutors />} />
        <Route path='/category' element={<ManageCategory />} />
      </Routes>
    </>
  )
}

export default AdminRoutes