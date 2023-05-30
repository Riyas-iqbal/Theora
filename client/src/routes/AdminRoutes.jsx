import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeroAdmin from'../pages/admin/HeroAdmin'
import '../pages/admin/satoshi.css'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageCategory from '../pages/admin/ManageCategory'
import { Toaster } from 'react-hot-toast'

function AdminRoutes() {
  
  return (
    <>
      <Routes>
      <div><Toaster position="bottom-center"  reverseOrder={true}/></div>
        <Route path='/' element={<HeroAdmin />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/category' element={<ManageCategory />} />
      </Routes>
    </>
  )
}

export default AdminRoutes