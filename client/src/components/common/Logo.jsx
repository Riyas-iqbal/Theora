import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ size = 1, tutor = false }) {
    return (
        <>
            {/* <div className='border-r border-l ring-1 border-blue-500 rounded-full px-1 flex flex-col hover:bg-blue-50' > */}
            <Link to={'/'} className='relative'>
                <h1 className={`${tutor ? 'text-orange-400': 'text-blue-600'  } ring-1 rounded-full px-2 text-center nexa-font hover:bg-blue-50`} style={{ fontSize: `${size}rem` }}>Theora</h1>
            </Link>
            {/* <span className='nexa-font  text-md text-blue-600 text-center' style={{ marginTop: -11, fontSize:size-8 }}>learning</span> */}
            {/* </div> */}
        </>
    )
}

export default Logo 