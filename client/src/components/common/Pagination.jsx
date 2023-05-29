import React, { useState } from "react";
import { useEffect } from "react";

export default function Pagination({ page, total, limit, setPage }) {
	const [newPage, setNewPage] = useState(page)
	
	const totalPages = Math.ceil(total / limit);

	useEffect(()=>{
		setPage(newPage)
	},[newPage])

	const setNext = () => {
		if (newPage < totalPages) {
			setNewPage(newPage + 1)
		} else {
			console.log('max page reached')
		}
	}

	const setPrev = () => {
		if (newPage > 1) {
			setNewPage(newPage - 1);
		} else {
			console.log('invalid page')
		}
	}

	const setCustom = (customPage) => {
		setNewPage(customPage)
	}


	return (
		<>
			<div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
				<div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
					{
						totalPages > 1 ?
							<>
								<div
									className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
									onClick={() => setPrev()}
								>
									<svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<p className="text-sm ml-3 font-medium leading-none ">Previous</p>
								</div>
								<div className="flex">
									{
										[...Array(totalPages)].map((val, index) => (
											<div className="sm:flex " key={index} >
												<p
													className={page === index + 1 ?
														'text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2'
														:
														"text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
													}
													onClick={() => setCustom(index + 1)}
												>
													{index + 1}
												</p>
												{/* <p className="">4</p> */}
											</div>
										))
									}
								</div>

								<div
									className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
									onClick={() => setNext()}
								>
									<p className="text-sm font-medium leading-none mr-3">Next</p>
									<svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
							</>
							:
							<div className="flex justify-center w-full">
								<p className='text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2'>
									{page}
								</p>
							</div>
					}
				</div>
			</div >
		</>
	);
}



