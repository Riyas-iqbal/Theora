import React from 'react'
import getuser from './getUser'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivate() {
    const user = getuser() 
    console.log(user)
    return user.loggedIn ? <Outlet /> : <Navigate to={'/tutor/signin'} />
}

export default UserPrivate