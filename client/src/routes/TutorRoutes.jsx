import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SignIn, SignUp, HeroTutor, } from '../pages/tutor'
import Navbar from '../components/tutor/Navbar'
import NotFound from '../pages/NotFound'

function TutorRoutes() {
    return (
        <>
            <NavbarWithRoutes />
            <Routes>
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />

                <Route path='/' element={<HeroTutor />} />
                <Route path='/course/' element={<CreateCourse />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

function NavbarWithRoutes() {
    const { pathname } = useLocation();
    console.log(pathname)
    if (pathname === '/tutor/signin' || pathname === '/tutor/signup') {
        return null;
    }
    return <Navbar />;
}

export default TutorRoutes