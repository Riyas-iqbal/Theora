import React from 'react'
import getTutor from './getTutor'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function TutorPrivate() {
    const tutor = getTutor()
    return tutor.loggedIn ? <Outlet /> : <Navigate to={'/tutor/signin'} />
}

export default TutorPrivate