import mongoose from 'mongoose'

const courseProgress = new mongoose.Schema({
    courseID : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }, 
    completedVideos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection"
        }
    ]

})
const CourseProgress = mongoose.model("CourseProgress", courseProgress)

export default CourseProgress