import React from 'react'
import getUser from './getUser'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function UserPrivate() {
    const {pathname} = useLocation()
    const user = getUser()
    return user.loggedIn ? <Outlet /> : <Navigate to={`/signin?private=true&from=${pathname}`} />
}

export default UserPrivate