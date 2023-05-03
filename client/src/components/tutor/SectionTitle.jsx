import React from 'react'

function SectionTitle({title = 'No title', description = ''}) {
    return (
        <div className='pb-5 ml-3 md:ml-16 md:pt-10'>
            <h1 className='text-amber-500 drop-shadow-sm nexa-font text-start  text-xl  md:text-4xl  font-black'>{title}</h1>
            <span className='text-gray-400 nexa-font text-start text-xs  md:text-sm  md:pt-3 font-black '>{description}</span>
        </div>
    )
}

export default SectionTitle