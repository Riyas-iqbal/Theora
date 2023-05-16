import React from 'react'
import getTutor from './getTutor'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TutorPrivate() {
    const tutor = getTutor()
    const state = useSelector(state => state)
    console.log('state', state)
    console.log('is logged in - ' , state.tutor.loggedIn)
    return state.tutor.loggedIn ? <Outlet /> : <Navigate to={'/tutor/signin'} />
}

export default TutorPrivate