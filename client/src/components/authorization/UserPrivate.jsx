import React from 'react'
import getUser from './getUser'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivate() {
    const user = getUser()
    return user.loggedIn ? <Outlet /> : <Navigate to={'/signin?private=true'} />
}

export default UserPrivate