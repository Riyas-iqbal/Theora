import React from 'react'
import { Spinner } from 'flowbite-react'

function Loading() {
    return (
        <div className="text-center absolute" style={{ left: '50%', top: '50%' }}>
            <Spinner aria-label="Center-aligned spinner example" />
        </div>
    )
}

export default Loading