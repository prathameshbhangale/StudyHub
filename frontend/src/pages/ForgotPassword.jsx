import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        getPasswordResetToken(email, setEmailSent,dispatch)
    }

  return (
    
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md m-auto ">
        {
            loading? (
                <div className="spinner"></div>
            ) : (<>
                <h2 className="text-2xl font-bold text-richblack-5 mb-4">Reset your password</h2>
              <p className="text-richblack-25 mb-6">
                Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email we can try account recovery
              </p>
              <form onSubmit={handleOnSubmit}>

              { !emailSent && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-richblack-25 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 bg-gray-700 text-richblack-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="myemailaddress@gmail.com"
                onChange={ (e) => setEmail(e.target.value) }
                required 
              />
            </div>
          )}
                <button 
                  type="submit" 
                  className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
                >
                  {!emailSent ? "Sumbit" : "Resend Email"}
                </button>
              </form>
              <div className="mt-4 text-center">
                <Link to="/login" className="text-richblack-25 hover:text-white transition-colors">&larr; Back to login</Link>
              </div>
                </>)
        }    
    </div>
  )
}

export default ForgotPassword
