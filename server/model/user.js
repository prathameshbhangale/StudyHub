import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"] 
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    image: {
        type : String,
        required : true,
    },
    token: {
        type : String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }
    ],
})

const User = mongoose.model('User', userSchema)

export default User
