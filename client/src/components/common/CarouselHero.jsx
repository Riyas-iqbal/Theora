import React from 'react'
import { Carousel,Footer } from 'flowbite-react'

function CarouselHero() {

    // const images = [
    //     '/user-banner-3.png',
    //     '/user-banner-1.jpg',
    //     '/user-banner-4.jpg',
    //     '/user-banner-3.png',
    //     '/user-banner-5.jpg'
    // ]

    const images = [
        'https://img.freepik.com/premium-photo/artificial-intelligence-robot-using-computer-software-gpt-binary-coding_31965-138188.jpg?w=1060',
        'https://img.freepik.com/premium-photo/abstract-modern-tech-programming-code-screen-developer_505353-177.jpg?w=1060',
        'https://img.freepik.com/free-photo/design-html-web-design-template-concept_53876-120438.jpg?w=1060&t=st=1686222033~exp=1686222633~hmac=9622e877a677a9b938e0e6c55d698eaf8cb6564b2bbbe3f035436dd5bf688884',
        'https://img.freepik.com/free-vector/teenager-drinks-coffee-bedroom-with-workspace-hacker-night_107791-5413.jpg?w=1060&t=st=1686221780~exp=1686222380~hmac=791650c5e9aaaa7c8454c87241b98a8c4fd5cd26f6c1f1172ae0b23a71e27ebd',
        'https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37350.jpg?w=1060&t=st=1686222087~exp=1686222687~hmac=6152c845d78f6b8d0e55659db7e9ef6489f5a0b36f274504fe28e0903f0f8597',
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

export default React.memo(CarouselHero)