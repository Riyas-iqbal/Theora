import React, { useEffect, useRef } from 'react'
import Typed from '../../utils/Typed'

function HeroUser() {

    const content = [
        'Welcome back to Theora',
        'Welcome back Theora where knowledge blooms',
        'Welcome back And Wisdom flourishes'
    ]

    return (
        <div className='flex justify-center items-center h-screen text-4xl'>
            <Typed data={content} customClass={'font-semibold nexa-font'} />
        </div>
    )
}

export default HeroUser