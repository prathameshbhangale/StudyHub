import mongoose from "mongoose"
import sendMail from "../utlity/mailSend"

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
        expires: 60 * 5, //The document will be automatically deleted after 5-minutes of its creation
    },
})

OTPSchema.pre('save', async function(next) {
    try {
        console.log('Document is ready to save')
        await sendMail(this.email, "Verification by Edutech", mailhtml(this.otp))
        next()
    } catch (error) {
        console.error('Error sending email:', error)
        next(error)
    }
})

const OTP = mongoose.model("OTP", OTPSchema)

export default OTP