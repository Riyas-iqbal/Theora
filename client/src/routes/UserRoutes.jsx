import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Navbar from '../components/user/Navbar'
import UserPrivate from '../components/authorization/UserPrivate'
import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import HeroUser from '../pages/user/HeroUser'
import NotFound from '../pages/NotFound'
import Explore from '../pages/user/Explore'
import Course from '../pages/user/Course'
import Enrolled from '../pages/user/Enrolled'
import ViewCourse from '../pages/user/ViewCourse'
import Profile from '../pages/user/Profile'

function UserRoutes() {


  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='user' element={<HeroUser />} />
        <Route path='explore' element={<Explore />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='courses/:id' element={<Course />} />
          <Route path='user/profile' element={<Profile />} />

        <Route element={<UserPrivate />}>
          <Route path='courses/enrolled' element={<Enrolled />} />
          <Route path='courses/enrolled/:id' element={<ViewCourse />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default UserRoutes