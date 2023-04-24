import React, { useEffect, useRef } from 'react'
import Typed from '../../utils/Typed'
import { Link } from 'react-router-dom'

function HeroTutor() {

    const content = [
        'Tutor Welcome back to Theora',
        'Tutor Welcome back Theora where knowledge blooms',
        'Tutor Welcome back And Wisdom flourishes'
    ]

    return (
        <>
            <Link to={'signin'} className='bg-blue-500 text-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign in</Link>
            <div className='flex justify-center items-center h-screen text-4xl'>
                <Typed data={content} customClass={'font-semibold nexa-font'} />
            </div>
        </>
    )
}

export default HeroTutor