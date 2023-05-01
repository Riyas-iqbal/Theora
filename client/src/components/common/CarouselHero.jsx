import React from 'react'
import { Carousel,Footer } from 'flowbite-react'

function CarouselHero() {

    const images = [
        'user-banner-3.png',
        'user-banner-1.jpg',
        'user-banner-4.jpg',
        'user-banner-3.png',
        'user-banner-5.jpg'
    ]

    return (
        <div className="h-40 sm:h-64 lg:h-96">
            <Carousel >
                {
                    images.map((image,index) => {
                        return <img className=''
                            key={index}
                            src={image}
                            alt="..."
                        />
                        
                    })
                }
            </Carousel>
            <Footer.Divider  />
        </div>
        
    )
}

export default CarouselHero