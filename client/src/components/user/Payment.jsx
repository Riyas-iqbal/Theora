import React from 'react'
import { createOrderAPI, verifyPaymentAPI } from '../../api/user'
import { useSelector } from 'react-redux';
import loadScript from '../../utils/loadScript'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Payment({ children, courseId, setIsEnrolled }) {

	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	console.log(user)

	const handleEnrollCourse = async () => {
		if (!user.loggedIn || !localStorage.getItem('isAuth')) {
			return navigate('/signin?private=true')
		}
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
		if (!res) {
			console.log('Razorpay sdk failed to load')
			toast.error("Something went wrong! please try again later");
			return;
		}

		const result = await createOrderAPI(courseId)
		if (!result) {
			console.log('Create Order API failed!')
			toast.error("Your order was unable to complete! please try again later");
			return;
		}

		const { amount, id: order_id, currency, orderId: order_id_from_db } = result.data.data;
		console.log(amount, order_id, currency, order_id_from_db);

		const options = {
			key: "rzp_test_L5RIFMQfLKhSkl", // Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: "Theora Learning",
			description: "Complete the payment for your course",
			order_id: order_id,
			handler: async function (response) {
				console.log(response)
				const body = {
					course_id: courseId,
					order_creation_id: order_id,
					order_id_from_db,
					razorpay_payment_id: response.razorpay_payment_id,
					razorpay_order_id: response.razorpay_order_id,
					razorpay_signature: response.razorpay_signature,
				};
				//verify payment signature and enroll in course
				const result = await verifyPaymentAPI(body)
				if (result?.data?.signatureIsValid === false) {
					toast.error('Payment verification failed', {
						duration: 1000
					})
				}
				toast.success('payment successful', {
					duration: 1000
				})
				setIsEnrolled(true)
			},
			prefill: {
				name: user?.name,
				email: user?.email,
				// contact: user?.phone,
			},
			notes: {
				address: "",
			},
			theme: {
				color: "#1a56db",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	return (
		<button
			onClick={() => handleEnrollCourse()}
			className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			{children}
		</button>
	)
}

export default Payment