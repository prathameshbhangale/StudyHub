import mongoose from "mongoose"
import mailSender from "../utlity/mailSend.js"
import mailhtml from "../maileInterface.js/otpVarification.js"

const OTPSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 500 * 1000, //The document will be automatically deleted after 5-minutes of its creation
    },
})

OTPSchema.pre('save', async function(next) {
    try {
        console.log('Document is ready to save')
        await mailSender(this.email, "Verification by Edutech", mailhtml(this.otp))
        next()
    } catch (error) {
        console.error('Error sending email:', error)
        next(error)
    }
})

const OTP = mongoose.model("OTP", OTPSchema)

export default OTP