import React from 'react'

function SectionTitle({title = 'No title', description = ''}) {
    return (
        <>
            <h1 className='text-blue-700 nexa-font text-start ml-16 text-4xl pt-10 font-black'>{title}</h1>
            <span className='text-gray-400 nexa-font text-start ml-16 text-sm pt-3 font-black'>{description}</span>
        </>
    )
}

export default SectionTitle