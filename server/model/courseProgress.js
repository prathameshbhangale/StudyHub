import mongoose from 'mongoose'

const courseProgress = new mongoose.Schema({
    courseID : {
        type : mongoose.SchemaType.Types.ObjectId,
        ref: "Course",
    }, 
    completedVideos : [
        {
            type : mongoose.SchemaType.Types.ObjectId,
            ref : "SubSection"
        }
    ]

})
const CourseProgress = mongoose.model("CourseProgress", courseProgress)

export default CourseProgress