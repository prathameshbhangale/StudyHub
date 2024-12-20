import Course from "../model/course.js"
import Category from "../model/category.js"
import User from "../model/user.js"
import { uploadImageToCloudinary } from "../utlity/imageUploader.js";
import Section from "../model/section.js";
import SubSection from "../model/subSection.js";
import CourseProgress from "../model/courseProgress.js";
import { ObjectId } from "mongodb";


const convertSecondsToDuration = (seconds) => {
    if (seconds < 0) throw new Error('Seconds must be a non-negative number');

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursStr = hours > 0 ? `${hours}h ` : '';
    const minutesStr = minutes > 0 ? `${minutes}m ` : '';
    const secsStr = `${secs}s`;

    return `${hoursStr}${minutesStr}${secsStr}`.trim();
}

export const createCourse = async (req, res) => {
    try {
        const userId = req.user.id
        let {
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag,
            category,
            status,
            instructions,
        } = req.body
        let thumbnail = req.files
        console.log(courseName)
        console.log(whatYouWillLearn)
        console.log(thumbnail)
        thumbnail = thumbnail.image
        console.log(thumbnail)
        price = Number(price)
        thumbnail = thumbnail.tempFilePath
        
        if(
            !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag || 
            !category
        ) {
            res.status(400).json({
                success: false,
                message: 'All Filds are mandatory',
            });
        }
        if(!status || status === undefined) {
            status = "Draft";
        }
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        console.log(instructorDetails)
        console.log("Instructor Details: " , instructorDetails);
        
        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                Message: 'Instructor Details Not Found',
            });
        }
        let categoryDetails = await Category.find({
            name: category
        });
        if(!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category Details Not Found',
            })
        }
        let thumbnailImage;
        if (thumbnail){
            thumbnailImage = await uploadImageToCloudinary(
                thumbnail, 
                process.env.FOLDER_NAME
            )
        }
        else{
            thumbnailImage = {
                secure_url : "https://res.cloudinary.com/dyaiwi8dn/image/upload/v1711855437/cld-sample-4.jpg"
            }
        }
        console.log(thumbnailImage)
        const newCourse = await Course.create ({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails[0]._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });
        let temp;
        temp = await User.findByIdAndUpdate(

            {_id: instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
        )
        let z = await Category.findByIdAndUpdate(
            categoryDetails[0]._id,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new : true }
        );
        res.status(200).json({
            success: true,
            data: newCourse,
            cat: z,
            message: "Course Created Successfully",
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to Create Course',
            error: error.message,            
        });
    }
};

export const getCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      console.log("data accepted")
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        // .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
            select: "-videoUrl",
          },
        })
        .exec()
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
      console.log(courseDetails)
      if (courseDetails.status === "Draft") {
        return res.status(403).json({
          success: false,
          message: `Accessing a draft course is forbidden`,
        });
      }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

export const getFullCourseDetails = async (req, res) => {
    try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
        _id: courseId,
    })
    .populate({
        path: "instructor",
        populate: {
        path: "additionalDetails",
        },
    })
    .populate("category")
    // .populate("ratingAndReviews")
    .populate({
        path: "courseContent",
        populate: {
        path: "subSection",
        },
    })
    .exec()

    let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
    return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
    })
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
    content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
    })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
    success: true,
    data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount
        ,
    },
    })
} catch (error) {
    return res.status(500).json({
    success: false,
    message: error.message,
    })
}
}
  
export const getInstructorCourses = async (req, res) => {
try {
    const instructorId = req.user.id

    const instructorCourses = await Course.find({
    instructor: instructorId,
    }).sort({ createdAt: -1 })

    res.status(200).json({
    success: true,
    data: instructorCourses,
    })
} catch (error) {
    console.error(error)
    res.status(500).json({
    success: false,
    message: "Failed to retrieve instructor courses",
    error: error.message,
    })
}
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        const course = await Course.findById(courseId)
        if (!course) {
        return res.status(404).json({ message: "Course not found" })
        }

        const instructor = course.instructor;
        

        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
        })
        }

        const courseSections = course.courseContent
        
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
}
  
