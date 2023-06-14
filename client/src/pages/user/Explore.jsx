import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { getAllCategoriesAPI, getAllCourseByQuery, getAllCoursesAPI } from '../../api/common'
import Loading from '../../components/common/Loading'
import Pagination from '../../components/common/Pagination'
import useDebounce from '../../hooks/useDebounce'
import { Badge } from 'flowbite-react'
import timeAgo from '../../utils/timeAgo'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let sortOptions = [
  { name: 'Alphabetical [A-Z]', sort: 'title', order: 'asc', current: true },
  { name: 'Alphabetical [Z-A]', sort: 'title', order: 'desc', current: false },
  { name: 'Most popular', sort: 'title', order: 'asc', current: false },
  { name: 'Best Rating', sort: 'rating', order: 'asc', current: false },
  { name: 'Newest', sort: 'createdAt', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]



const subCategories = [
  // { name: 'Programming', href: '#' },
  // { name: 'Backend', href: '#' },
  // { name: 'Frontend', href: '#' },
  // { name: 'Dev ops', href: '#' },
  // { name: 'Artificial Intelligence ', href: '#' },
]
let filters = [
  {
    id: 'difficulty',
    name: 'Difficulty',
    options: [
      // { value: 'all', label: 'All', checked: true },
      { value: 'beginner', label: 'Beginner', checked: false },
      { value: 'intermediate', label: 'Intermediate', checked: false },
      { value: 'advanced', label: 'Advanced', checked: false },
      { value: 'expert', label: 'Expert', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'backend development', checked: false },
      { value: 'frontend development', label: 'Sale', checked: false },
      { value: 'data science', label: 'Travel', checked: false },
      { value: 'app development', label: 'Organization', checked: false },
      { value: 'web design', label: 'Accessories', checked: false },
    ],
  }
]



export default function Explore() {
  console.count('Rerender')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)



  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState([])

  const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
  const [difficulty, setDifficulty] = useState([])
  const [category, setCategory] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const [search, setSearch] = useState("")
  const [total, setTotal] = useState(0)

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const query =
      `page=${page}&sort=${sort.sort},${sort.order}&difficulty=${difficulty.toString()}&category=${category.toString()}&search=${debouncedSearch}&limit=${limit}`

    console.count(query)

    getAllCourseByQuery(query)
      .then(({ data }) => {
        setCourses(data.data)
        setTotal(data.total)
        setTimeout(() => setIsLoading(false), 1000);
      })
  }, [sort, page, debouncedSearch, difficulty, category])

  useEffect(() => {
    getAllCategoriesAPI()
      .then(({ data }) => {
        const options = data.categories.map((category) => {
          return {
            value: category.title,
            checked: false
          }
        })

        filters[1].options = [...options]
        console.log(filters[1])
      })
  }, [])

  //clean up sort 
  useEffect(() => {
    return () => {
      console.log('clean up')
      sortOptions = sortOptions.map(sort => {
        if (sort.sort === 'title' && sort.order === 'asc') {
          return { ...sort, current: true }
        } else {
          return { ...sort, current: false }
        }
      })
    }
  }, [])


  const handleSort = (sort, order = 'asc', targetIdx) => {
    setSort({ sort: sort, order: order })
    sortOptions = sortOptions.map((option, idx) => {
      if (targetIdx === idx) {
        return { ...option, current: true }
      }
      return { ...option, current: false }
    })
  }

  //build up filter query on change
  const handleFilter = (targetOption, filterId) => {
    filters = filters.map(filter => {
      if (filter.id === filterId) {
        const updatedOptions = filter.options.map(option => {
          if (option.value === targetOption.value && option.checked === false) {
            return { ...option, checked: true }
          } else if (option.value === targetOption.value && option.checked === true) {
            return { ...option, checked: false }
          }
          return option
        })
        return { ...filter, options: updatedOptions }
      }
      return filter
    })
    buildFilterQuery(filterId)
  }


  const buildFilterQuery = (filterId) => {
    const newFilter = []
    filters.forEach(filter => {
      if (filter.id === filterId) {
        filter.options.forEach(option => {
          if (option.checked) {
            newFilter.push(option.value)
          }
        })
      }
    })
    if (filterId === 'category') {
      setCategory(newFilter)
    }
    if (filterId === 'difficulty') {
      setDifficulty(newFilter)
    }
    setPage(1)
  }

  const onSearchChange = ((value) => {
    setPage(1)
    setSearch(value)
  })

  return (
    <div className='p-6'>
      <div className="nexa-font rounded-2xl bg-white">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500 ">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={() => { handleFilter(option, section.id) }}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>

                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-blue-500">Explore Courses</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                      {sortOptions.map((option, idx) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleSort(option.sort, option.order, idx)}
                              className={classNames(
                                option.current ? 'font-bold text-indigo-500 bg-gray-50' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm w-full text-left'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
              {/* form Filters */}

              <div className="hidden lg:block">
                {/* search input */}
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input
                    type="search"
                    className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>


                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={() => { handleFilter(option, section.id) }}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 capitalize"
                                >
                                  {option.value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>

              {/* Product grid */}
              <div className="lg:col-span-5">
                {
                  isLoading ?
                    <Loading />
                    :
                    <>
                      <div className='flex flex-wrap justify-center gap-1'>
                        {
                          courses.length
                            ?
                            courses.map((course) => {
                              return <div
                                key={course._id}
                                // style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
                                className="w-full max-w-xs block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5">
                                <div className='overflow-hidden '>
                                  <Link to={`/courses/${course._id}`} className=''>
                                    <img className="min-h-[13rem] max-h-[13rem] min-w-full object-cover rounded-t-lg duration-300 scale-105 hover:scale-100" src={course.thumbnailURL} alt="product image" />
                                  </Link>
                                </div>
                                <div className="px-5 pb-5 flex flex-col justify-end ">
                                  <Link to="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white pt-4 nexa-font">{course.title}</h5>
                                    <h5 className="text-sm font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">{course.tagline}</h5>
                                  </Link>
                                  <div className='py-4 flex justify-between '>
                                    <div>
                                      <Badge color="info" className='w-fit capitalize mb-1'>
                                        {course.category}
                                      </Badge>
                                      <Badge color={course.difficulty === 'expert' || course.difficulty === 'advanced' ? 'warning' : 'indigo'} className='w-fit capitalize'>
                                        {course.difficulty}
                                      </Badge>
                                    </div>
                                    <Badge color="purple" className='capitalize'>
                                      {timeAgo(course.createdAt)}
                                    </Badge>
                                  </div>
                                  {/* <div className="flex items-center mt-2.5 mb-5">
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                  </div> */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-start justify-start">
                                      {/* <span className="text-sm font-bold text-red-700 line-through dark:text-white">₹{course.price}</span> */}
                                      <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{course.price}</span>
                                    </div>
                                    <Link to={`/courses/${course._id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enroll</Link>
                                  </div>
                                </div>
                              </div>
                            })
                            :
                            <>
                              <h1 className='nexa-font'>Oops! No courses found</h1>
                            </>
                        }
                      </div>
                      <div className='mt-10'>

                        <Pagination page={page}
                          total={total || 0}
                          limit={limit}
                          setPage={(page) => { setPage(page) }}
                        />

                      </div>
                    </>
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
