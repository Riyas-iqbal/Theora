import React from 'react'
import { getUser } from './getUser'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function UserPrivate() {
    const { pathname } = useLocation()
    //get isAuth Boolean from localstorage
    const user = localStorage.getItem('isAuth')
    return user ? <Outlet /> : <Navigate to={`/signin?private=true&from=${pathname}`} />
}

export default UserPrivate