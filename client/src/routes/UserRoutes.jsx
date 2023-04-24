import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import HeroUser from '../pages/user/HeroUser'

function UserRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HeroUser />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default UserRoutes