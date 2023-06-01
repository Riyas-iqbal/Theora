import { Navbar as NavBar, Button } from 'flowbite-react'
import Logo from '../common/Logo'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuDropDown from './MenuDropdown'

function Navbar() {

    const tutor = useSelector(state => state.tutor)
    const { pathname } = useLocation()



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
            <Logo className='mr-3' to={'/tutor'} size={1.3} tutor />

            <div className="flex md:order-2">
                {
                    tutor.loggedIn ?
                        <MenuDropDown className='w-3' user={tutor.name} />
                        :
                        <Button className='bg-amber-500 hover:bg-amber-300'>
                            <Link to='signin'>Sign In</Link>
                        </Button>
                }
                <NavBar.Toggle />
            </div>
            <NavBar.Collapse>
                
                <Link className='hover:text-amber-500' to="/tutor">
                    <span className={pathname === '/tutor' ? 'text-amber-600' : null}>
                        Home
                    </span>
                </Link>

                <Link className='hover:text-amber-500' to="/tutor/courses" >
                    <span className={pathname === '/tutor/courses' ? 'text-amber-600' : null}>
                        Manage Courses
                    </span>
                </Link>

                {/* <Link className='hover:text-amber-500' to="/tutor/dashboard" >
                    <span className={pathname === '/tutor/dashboard' ? 'text-amber-600' : null}>
                        Dashboard
                    </span>
                </Link> */}
                
                {/* <Link className='hover:text-amber-500' to="/newsletters" active={pathname === '/tutor/newsletters' ? true : null}>
                    Standings
                </Link>
                
                <Link className='hover:text-amber-500' to="/contact" active={pathname === '/tutor/contact' ? true : null}>
                    FAQ
                </Link> */}

            </NavBar.Collapse>
        </NavBar>
    )
}

export default Navbar