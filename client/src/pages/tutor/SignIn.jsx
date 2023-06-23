import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../components/common/Logo'
import { useDispatch } from 'react-redux'
import { setTutor } from '../../features/tutorSlice'
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../../utils/constants'



function SignIn() {

  const dispatch = useDispatch()

  let [searchParams, setSearchParams] = useSearchParams();
  const accessedPrivate = searchParams.get('private');
  const logout = searchParams.get('logout');

  // const notify = () => 

  useEffect(() => {
    if (accessedPrivate) {
      toast.error('Please login to continue');
    }

    if (logout) {
      toast.success('You have been logged out successfully');
    }
  }, [])


  // change to react hook form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const handleSingIn = (e) => {
    e.preventDefault()
    console.log(email, password)
    axios.post(
      `${BASE_URL}auth/tutor/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        dispatch(setTutor(response.data?.user))
        navigate('..')
      })
      .catch((err) => {
        console.log('errrorr', err)
        setError(err.response.data.message)
      })
  }


  return (
    <>
      <div><Toaster /></div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 h-screen">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <div className='flex justify-center'>
            <Logo size={1.7} tutor={true} to='/tutor' />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in as tutor and explore
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500">
            Ready to start exploring new perspectives?{' '}
            <Link to="../signup" className="font-semibold leading-6 text-amber-400 hover:text-amber-500">
              Create an account!
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn