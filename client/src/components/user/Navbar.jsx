import { Navbar as NavBar, Button } from 'flowbite-react'
import Logo from '../common/Logo'
import { Link } from 'react-router-dom'
import React from 'react'

function Navbar() {
    return (
        <NavBar 
        style={{ backgroundColor: 'rgb(243 244 246)', marginTop: '10px' }}
        fluid={true}
        rounded={true}
        >
            {/* <NavBar.Brand href="https://flowbite.com/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite
                </span>
            </NavBar.Brand> */}
            <Logo className='mr-3' to={'/user'} size={1.3} />
            <div className="flex md:order-2">
                <Button>
                    <Link to='signin'>Sign In</Link>
                </Button>
                <NavBar.Toggle />
            </div>
            <NavBar.Collapse>
                <NavBar.Link
                    href="/user"
                    active={true}
                >
                    Home
                </NavBar.Link>
                <NavBar.Link href="/explore">
                    Explore
                </NavBar.Link>
                <NavBar.Link href="/blogs">
                    Blogs
                </NavBar.Link>
                <NavBar.Link href="/newsletters">
                    Newsletter
                </NavBar.Link>
                <NavBar.Link href="/contact">
                    Contact
                </NavBar.Link>

            </NavBar.Collapse>
        </NavBar>
    )
}

export default React.memo(Navbar)