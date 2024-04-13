import otpGenerator from 'otp-generator'
import OTP from "../model/otp.js"
import User from "../model/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailSender from '../utlity/mailSend.js'
import passwordUpdated from '../maileInterface.js/passwordUpdated.js'

export const sendOTP = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(401).json({
                success : false,
                massage: "user not exist with given email",
            })
        }
        let otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets: false
        })
        const otpSaved = await OTP.create({email,otp})
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })
    } catch (err) {
        console.log('error in sendOTP from controller ',err)
        return res.status(402).json({
            success: false,
            message: err.message
        })
    }
}

export const signup = async (req,res) => {
    try {
        const {
            firstName, 
            lastName, 
            email,
            password,
            confirmPassword,
            accountType, 
            contactNumber,
            otp,
        } = req.body
        if(!(firstName || lastName || email || password || confirmPassword || accountType || contactNumber || otp)){
            return res.status(400).json({
                success: false,
                message: "incomplete input"
            })
        }
        if(password != confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password not matching, please try again"
            })
        }
        const user = await User.findOne({ email: email })
        if(user){
            return res.status(400).json({
                success: false,
                message: "email already exist"
            })
        }
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1)
        if(response){
            return res.status(400).json({
                success: false,
                message: "out off time for OTP"
            })
        }
        else if(response.otp != otp){
            return res.status(400).json({
                success: false,
                message: "OTP is not matching"
            })
        }
        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUND)
        let approved;
        if(accountType == "student") {
            approved = true
        }else{
            approved=false
        }
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user1 = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
        })
        
    } catch (err) {
        console.log('error in signup from auth.js')
        return res.status(400).json({
            success: false,
            message: err.massage
        })
    }
}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                massage: "incomplete input"
            })
        }
        let user = await User.findOne({ email: email }).populate('additionalDetails')
        if(!user) {
            return res.status(401).json({
                //Return 401 unauthorized status code with error message
                success: false,
                message: `User is not registered with Us, Please signup to Continue`,
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch){
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: '2h',
            })
            user.token = token
            try {
                await user.save()               
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "token is not stored in db "
                })
            }
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            return res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message : "invalid password"
            })
        }
    } catch (err) {
        console.log('error in login from auth ')
    }
}

export const changePassword = async (req,res) =>{
    try {
        const {oldpassword,newpassword} = req.body
        if(!oldpassword || !newpassword){
            return res.status(400).json({
                success: false,
                message: "incomplete input for change password"
            })
        }
        const encryptedPassword = await bcrypt.hash(newPassword,process.env.SALT_ROUND )
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )
        try {
            const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Password for your account has been updated",
            passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
            )
            console.log("Email sent successfully:", emailResponse.response)
            return res.status(200).json({ success: true, message: "Password updated successfully" })
        }catch (error) {
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
            })
        }
    } catch (error) {
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
    })
    }
}