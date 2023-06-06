import React, { useState, useEffect } from 'react'
import ProfileLayout from '../../components/user/ProfileLayout'
import Breadcrumb from '../../components/user/Breadcrumb'
import { Switch } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../utils/validation'
import { ExclamationCircleIcon, LockClosedIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getUserDetailsAPI, updateUserDetailsAPI } from '../../api/user'
import { toast } from 'react-hot-toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


//Not responsive
function Profile() {
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  console.count('rerender')

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    console.log('mounted')
    getUserDetailsAPI()
      .then(response => {
        const userDetails = response.data.userDetails

        //maintain order to compare later
        setUserDetails({
          name: userDetails.name,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone,
          website: userDetails.website,
          about: userDetails.about,
        })
        // Object.keys(userDetails).forEach(key => {
        //   setValue(key,userDetails[key])
        // })
        setValue('name', userDetails.name)
        setValue('lastName', userDetails?.lastName ?? '')
        setValue('email', userDetails.email)
        setValue('phone', userDetails.phone)
        setValue('about', userDetails?.about ?? '')
        setValue('website', userDetails?.website ?? '')
      })
      .catch(err => console.log(err))
  }, [])

  const handleOnSubmit = (data) => {
    setError(null)

    //compare old UserDetails with new UserDetails 
    const newData = JSON.stringify(data)
    const oldData = JSON.stringify(userDetails)
    console.log(newData == oldData)
    if (newData == oldData) {
      setError('No change detected. Please review your entered data and make any necessary modifications before submitting.')
      return
    }

    updateUserDetailsAPI(data)
      .then(response => {
        toast.success('Profile updated successfully', {
          duration: 3000,
        })
      })
      .catch(err => {
        console.log(err)
        setError(err?.respoonse.errors.message)
      })
  }

  return (
    <ProfileLayout>
      <Breadcrumb pageName={'Profile'} />
      <div className="isolate bg-white px-6 lg:px-8">
        <div className="mx-auto max-w-2xl relative text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage Profile</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Update your profile
          </p>
          <div className='absolute ml-13'>
            {
              editMode ?
                <h1 className='py-1 px-2 text-sm rounded-md bg-indigo-500 text-white'>edit mode</h1>
                :
                <h1 className='py-1 px-2 text-sm rounded-md bg-gray-500 text-white'>view only</h1>
            }
          </div>
          <span
            className='absolute flex flex-col justify-center items-center right-10'
            data-te-toggle="tooltip"
            title={editMode ? 'Turn off edit mode' : 'Turn on edit mode'}>
            {
              editMode ?
                <PencilSquareIcon className='w-6 hover:scale-105 duration-300 cursor-pointer text-primary font-extrabold' />
                :
                <LockClosedIcon className='w-6 hover:scale-105 duration-300 cursor-pointer text-red-500' />

            }
            <Switch
              checked={editMode}
              onChange={() => setEditMode(!editMode)}
              className={classNames(
                editMode ? 'bg-indigo-600' : 'bg-gray-200',
                'flex w-8 flex-none cursor-pointer mt-3 rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              )}
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className={classNames(
                  editMode ? 'translate-x-3.5' : 'translate-x-0',
                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
            {/* <span className='text-gray-400'>edit</span> */}
          </span>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  {...(editMode ? null : { disabled: true })}
                  type="text"
                  id="first-name"
                  autoComplete='off'
                  {...register('name')}
                  className={classNames(errors.name ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                />
              </div>
              <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.name?.message}</p>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  {...(editMode ? null : { disabled: true })}
                  type="text"
                  id="last-name"
                  autoComplete='off'
                  {...register('lastName')}
                  className={classNames(errors.lastName ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                />
              </div>
              <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.lastName?.message}</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  {...(editMode ? null : { disabled: true })}
                  type="email"
                  {...register('email')}
                  autoComplete='off'
                  id="email"
                  className={classNames(errors.email ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                // className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.email?.message}</p>

            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="relative mt-2.5">
                <input
                  {...(editMode ? null : { disabled: true })}
                  type="tel"
                  id="phone"
                  autoComplete='off'
                  {...register('phone')}
                  className={classNames(errors.phone ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                // className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.phone?.message}</p>

            </div>
            <div className="sm:col-span-2">
              <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900 ">
                Website/Blog<span className='text-xs ml-3 mb-1 text-gray-400 text-end'>(optional)</span>
              </label>
              <div className="mt-2.5">
                <div className='relative flex items-center'>
                  {errors?.website && <ExclamationCircleIcon className='text-red-700 absolute w-6 text-center  z-1 right-1' />}
                  <input
                    {...(editMode ? null : { disabled: true })}
                    type="text"
                    id="website"
                    autoComplete='off'
                    {...register('website')}
                    className={classNames(errors.website ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                  />
                </div>
                <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.website?.message}</p>
                {
                  watch('website') && !errors.website && <a href={watch('website')} className='focus:animate-ping-once relative items-center text-primary hover:text-indigo-800 text-xs py-2 pl-4 bg-gray-100 flex rounded'>
                    {watch('website')}
                  </a>
                }
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Bio/About Me<span className='text-xs ml-3 mb-1 text-gray-400 text-end'>(optional)</span>
              </label>
              <div className="mt-2.5">
                <textarea
                  {...(editMode ? null : { disabled: true })}
                  name="message"
                  id="message"
                  autoComplete='off'
                  rows={4}
                  {...register('about')}
                  className={classNames(errors.about ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                  // className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.about?.message}</p>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to make your{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  profile&nbsp;public
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className='flex justify-center'>
          </div>
          <div className="mt-10">
            <button
              {...(editMode ? null : { disabled: true })}
              type="submit"
              className={`${editMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'} ${error ? ' ring-1 ring-opacity-40 ring-red-700 ring-offset-2' : null} block w-full rounded-md px-3.5 py-2.5  text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Update Profile
            </button>
            <p className='text-red-600 nexa-font text-xs text-center mt-3 ml-1'>{error}</p>
          </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default Profile
