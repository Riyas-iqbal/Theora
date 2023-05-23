import React from 'react'
import getuser from './getUser'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivate() {
    const user = getuser()
    return user.loggedIn ? <Outlet /> : <Navigate to={'/signin?private=true'} />
}

export default UserPrivate