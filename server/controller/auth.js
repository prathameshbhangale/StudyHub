import otpGenerator from 'otp-generator'
import OTP from "../model/otp.js"
import User from "../model/user.js"

const saltRounds = 7

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
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        let approved;
        if(accountType == "student") {
            approved = true
        }else{
            approved=false
        }
        const profileDetails = await  Profile.create({
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