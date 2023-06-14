import { Navbar as NavBar, Button } from 'flowbite-react'
import Logo from '../common/Logo'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import MenuDropDown from '../user/MenuDropdown'

function Navbar() {

	// const dispatch = useDispatch()
	const user = useSelector(state => state.user)

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
			<Logo className='mr-3' to={'/user'} size={1.3} />
			<div className="flex md:order-2">
				{
					user?.loggedIn ?
						<MenuDropDown className='w-3' user={user} />
						// <button className='mr-3 bg-indigo-200 p-1 pr-3 rounded-xl flex hover:shadow-3 hover:bg-indigo-300'>
						// 	<UserCircleIcon className='w-6 mr-2' />
						// 	<span className='nexa-font '>{user.name}</span>
						// </button>
						:
						pathname !== '/signin' && <Button>
							<Link to={`signin?from=${pathname}`}>Sign In</Link>
						</Button>
				}

				<NavBar.Toggle />
			</div>
			<NavBar.Collapse>
				<Link to="/user" className='hover:text-indigo-500' >
					<span className={pathname === '/user' ? 'text-indigo-600' : null}>
						Home
					</span>
				</Link>
				<Link to="/explore" className='hover:text-indigo-500' >
					<span className={pathname === '/explore' ? 'text-indigo-600' : null}>
						Explore
					</span>
				</Link>
				<Link to="/courses/enrolled" className='hover:text-indigo-500' >
					<span className={pathname === '/courses/enrolled' ? 'text-indigo-600' : null}>
						Enrolled
					</span>
				</Link>
				<Link to="user/profile" className='hover:text-indigo-500' >
					<span className={pathname === 'user/profile' ? 'text-indigo-600' : null}>
						Profile
					</span>
				</Link>
				{/* <Link to="/newsletters" className='hover:text-indigo-500' >
					<span className={pathname === '/newsletters' ? 'text-indigo-600' : null}>
						Newsletter
					</span>
				</Link>
				<Link to="/Contact" className='hover:text-indigo-500' >
					<span className={pathname === '/Contact' ? 'text-indigo-600' : null}>
						Contact
					</span>
				</Link> */}
			</NavBar.Collapse>
		</NavBar>
	)
}

export default React.memo(Navbar)