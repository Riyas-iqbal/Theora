import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '../../components/common/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/userSlice'
import { Toaster, toast } from 'react-hot-toast'
import { userSignInAPI } from '../../api/user'

function SignIn() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  let [searchParams] = useSearchParams();
  const accessedPrivate = searchParams.get('private');
  const fromLocation = searchParams.get('from');
  const sessionExpired = searchParams.get('expired');
  const newUser = searchParams.get('new');
  const logout = searchParams.get('logout');

  useEffect(() => {
    if (user.loggedIn) {
      navigate('/user')
    }
    if (newUser) {
      toast.dismiss()
      toast.success('Welcome to theora! Please login', {
        duration: 2000
      })
    }
    if (logout) {
      toast.dismiss()
      toast.success('Missing You Already, Come Back Soon!', {
        icon: '😪',
        duration: 4000
      })
    }
    if (accessedPrivate) {
      console.log(accessedPrivate)
      toast.dismiss()
      toast.error('Please login to continue');
    }
    
    if (sessionExpired) {
      toast.dismiss()
      toast.error('Session timeout! Please login again')
    }
  }, [])
  
  // change to react hook form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate();
  
  //covert to react API
  const handleSingIn = (e) => {
    e.preventDefault()
    userSignInAPI({ email, password })
    .then((response) => {
      //set isAuth
      localStorage.setItem('isAuth', true)
      //success notification
      toast.success(`Hey ${response.data.user.name}, Welcome back to theora!`, {
        duration: 6000
      })

        //set global user state
        dispatch(setUser({ ...response.data?.user, userId: response.data.user._id }))
        if (fromLocation) {
          return navigate(fromLocation)
        }
        return navigate('/user')
      })
      .catch((err) => {
        console.log(err)
        setError(err?.response?.data?.errors?.message)
      })
  }


  return (
    <>
      <div><Toaster /></div>
      <div className="flex nexa-font min-h-full flex-1 flex-col justify-center px-6 lg:px-8 h-screen ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <div className='flex justify-center'>
            <Logo size={1.7} />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in and explore
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  required
                  className="block w-full nexa-font rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="../forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  required
                  className="block nexa-font w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='flex justify-center'>
              <span className='text-red-400 text-center font-bold nexa-font'>{error}</span>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSingIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500">
            Ready to start exploring new perspectives?{' '}
            <Link to="../signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account!
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn