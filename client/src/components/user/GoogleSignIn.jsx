import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebase from '../../config/firebase'
import { verifyFirebaseSignIn } from '../../api/common';
import { toast } from 'react-hot-toast';

function GoogleSignIn({ handleSignInSuccess }) {
  const initializeGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);

    try {
      const result = await signInWithPopup(auth, provider) 
      const token = await result.user.getIdToken()
      const response = await verifyFirebaseSignIn(token)
      handleSignInSuccess(response.data.user);
    } catch (error) {
      // show error message from server if present
      if (error?.response?.data?.errors?.message) {
        toast.error(error.response.data.errors.message)
      } else {
        console.log('unexpected error in google signin',error)
      }
    }
  }

  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      onClick={initializeGoogleSignIn}
    >
      <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
      </svg>
      Sign in with Google
    </button>
  )
}



export default GoogleSignIn