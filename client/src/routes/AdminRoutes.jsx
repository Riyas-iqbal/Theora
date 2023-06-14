import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeroAdmin from '../pages/admin/HeroAdmin'
import '../pages/admin/satoshi.css'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageTutors from '../pages/admin/ManageTutors'
import ManageCategory from '../pages/admin/ManageCategory'
import SignIn from '../pages/admin/SignIn'
import { Toaster } from 'react-hot-toast'
import AdminPrivate from '../components/authorization/AdminPrivate'
function AdminRoutes() {

  return (
    <>
      <div><Toaster position="bottom-center" reverseOrder={true} /></div>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route element={<AdminPrivate />}>
          <Route path='/' element={<HeroAdmin />} />
          <Route path='/users' element={<ManageUsers />} />
          <Route path='/tutors' element={<ManageTutors />} />
          <Route path='/category' element={<ManageCategory />} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes