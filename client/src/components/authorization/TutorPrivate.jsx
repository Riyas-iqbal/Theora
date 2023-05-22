import React from 'react'
import getTutor from './getTutor'
import { Navigate, Outlet } from 'react-router-dom'

function TutorPrivate() {
    const tutor = getTutor()
    console.log('is logged in - ' , tutor.loggedIn)
    return tutor.loggedIn ? <Outlet /> : <Navigate to={'/tutor/signin?private=true'} />
}

export default TutorPrivate