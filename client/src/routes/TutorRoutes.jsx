import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp, HeroTutor} from '../pages/tutor'

function TutorRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HeroTutor />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
        </Routes>
    )
}

export default TutorRoutes