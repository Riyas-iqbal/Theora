import React, { useState } from 'react'
import ProfileLayout from '../../components/user/ProfileLayout'
import Breadcrumb from '../../components/user/Breadcrumb'
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../utils/validation'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Profile() {
  const [agreed, setAgreed] = useState(false)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const handleOnSubmit = (data) => {
    console.log(data)
  }


  return (
    <ProfileLayout>
      <Breadcrumb pageName={'Profile'} />
      <div className="isolate bg-white px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage Profile</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Update your profile
          </p>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
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
                    type="text"
                    id="website"
                    autoComplete='off'
                    {...register('website')}
                    className={classNames(errors.website ? 'ring-red-600 rounded-md focus:ring-red-600' : 'ring-gray-300 focus:ring-indigo-600', "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6")}
                  />
                </div>
                <p className='text-red-600 nexa-font text-xs mt-2 ml-1'>{errors.website?.message}</p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Bio/About Me<span className='text-xs ml-3 mb-1 text-gray-400 text-end'>(optional)</span>
              </label>
              <div className="mt-2.5">
                <textarea
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
                By selecting this, you agree to our{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default Profile
