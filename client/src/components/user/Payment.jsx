import React from 'react'
import { createOrderAPI,verifyPaymentAPI } from '../../api/user'
import { useSelector } from 'react-redux';
import loadScript from '../../utils/loadScript'

function Payment({ children, courseId }) {


    const user = useSelector(state=>state.user)

    const handleEnrollCourse = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await createOrderAPI(courseId)
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data.data;
        console.log(amount,order_id,currency);
        const options = {
            key: "rzp_test_L5RIFMQfLKhSkl", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Theora Learning",
            description: "Complete the payment for your course",
            order_id: order_id,
            handler: async function (response) {
                console.log(response)
                const data = {
                    orderCreationId: order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                const result = await verifyPaymentAPI(data)

                alert(result.data.signatureIsValid);
            },
            prefill: {
                name: user?.name,
                email: user?.email,
                contact: user?.phone,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#61dafb",
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