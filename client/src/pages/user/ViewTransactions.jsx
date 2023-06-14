import React from 'react'
import ProfileLayout from '../../components/user/ProfileLayout'
import Breadcrumb from '../../components/user/Breadcrumb'
import { useEffect, useState } from 'react'
import Loading from '../../components/common/Loading'
import { getAllOrdersByUserAPI } from '../../api/user'
import { Badge, Button } from 'flowbite-react'

function ViewTransactions() {
	const [transactions, setTransactions] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		getAllOrdersByUserAPI()
			.then(({ data }) => {
				console.log(data)
				setTransactions(data.data)
				setIsLoading(false)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<ProfileLayout>
			<Breadcrumb pageName='Transactions' />
			<div>
				<div className="mx-auto max-w-2xl relative text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage Transactions</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						View your transactions
					</p>
				</div>
				<div className='mt-16'>
					{
						isLoading ?
							<Loading />
							:
							transactions.length ?
								<>
									<div className='flex flex-col-reverse gap-3'>
										{transactions.map(transaction => (
											<div key={transaction._id} className='min-w-2xl border rounded-xl overflow-hidden h-27  flex justify-between '>
												<div className='flex items-center '>
													<div className='w-60 justify-center flex items-center text-center bg-gray-100 h-full'>
														<div>
															<h1 className='text-xl capitalize'>{transaction.course.title}</h1>
															<span className='text-sm'>{transaction.course.tagline}</span>
														</div>
													</div>
													<div className='ml-5 first:capitalize '>
														<h1 className='text-xl capitalize'>{transaction.title}</h1>
														<h1 className='text-sm '>{transaction.tagline}</h1>
														<div className='flex mt-1 gap-2'>
															Current price
															<Badge size='2' color={'warning'} className='w-fit capitalize'>
																₹{transaction.course.price}
															</Badge>
														</div>
													</div>
												</div>
												<div className='flex  gap-2 items-center mr-5'>
													{
														transaction.status === 'completed' ?
															<div>
																<div className='flex gap-2'>
																	<Badge size='2' color='success' >
																		Payment successfull
																	</Badge>
																	₹{transaction.price}
																</div>
																<span className='text-xs'>
																	completed on : {new Date(transaction.createdAt).toDateString()}
																</span>
															</div>
															:
															<div className='flex flex-col justify-center items-center mr-5 gap-2'>
																<div>
																	<Badge size='2' className='w-fit float-left capitalize'>
																		₹{transaction.price}
																	</Badge>
																	<span className='ml-3 text-red-500'>
																		failed
																	</span>
																</div>
																<span className='text-xs text-gray-500'>
																	{new Date(transaction.createdAt).toDateString()}
																</span>
															</div>
													}
												</div>
											</div>
										))}
									</div>
								</>
								:
								<div className='flex justify-center items-center'>
									<p>you dont havent any transactions yet</p>
								</div>
					}
				</div>
			</div>

		</ProfileLayout>
	)
}

export default ViewTransactions