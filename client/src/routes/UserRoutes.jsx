import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

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
import CourseOwned from '../pages/user/CourseOwned'
import ViewTransactions from '../pages/user/ViewTransactions'
import { setUser } from '../features/userSlice'
import { getSignedInUserAPI } from '../api/user'
import { useDispatch } from 'react-redux'

function UserRoutes() {
  const dispatch = useDispatch()

  useEffect(() => {
    getSignedInUserAPI()
      .then(response => {
        let userData = response.data?.userData || null
        if (!userData) {
          console.log('user not logged in')
          localStorage.removeItem('isAuth')
          return
        }
        dispatch(setUser({ ...response.data?.userData, userId: response.data.userData._id }))
      })
      .catch(err => {
        console.log('error',err)
      })
  }, [])


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

        <Route element={<UserPrivate />}>
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/profile/courses' element={<CourseOwned />} />
          <Route path='user/profile/transactions' element={<ViewTransactions />} />
          <Route path='courses/enrolled' element={<Enrolled />} />
          <Route path='courses/enrolled/:id' element={<ViewCourse />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default UserRoutes