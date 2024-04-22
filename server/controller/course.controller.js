import Course from "../model/course.js"
import Category from "../model/category.js"
import User from "../model/user.js"
import { uploadImageToCloudinary } from "../utlity/imageUploader.js";
import Section from "../model/section.js";
import SubSection from "../model/subSection.js";
import CourseProgress from "../model/courseProgress.js";
import { ObjectId } from "mongodb";

//TODO: Add pagination

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
        const thumbnail = req.files.thumbnailImage

        //validation -> check if any of the required fields are missing
        if(
            !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag || 
            !thumbnail || 
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
        console.log("Instructor Details: " , instructorDetails);
        //TODO: Verify that userId and instructorDetails._id are same or different-> ?

        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                Message: 'Instructor Details Not Found',
            });
        }
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category Details Not Found',
            })
        }

        //Upload thumbnail Image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail, 
            process.env.FOLDER_NAME
        )
        console.log(thumbnailImage);
        //create an entry for new Course with the given details
        const newCourse = await Course.create ({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        //add the new Course to the user schema of instructor
        await User.findByIdAndUpdate(

            {_id: instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
        )

        //Add the new course to the categories
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new : true }
        );

        //Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });

    } catch(error) {
        //Handle any errors that occur during the creation of the course
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
        .populate("ratingAndReviews")
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
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
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
    .populate("ratingAndReviews")
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

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

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
        completedVideos: courseProgressCount?.completedVideos
        ? courseProgressCount?.completedVideos
        : [],
    },
    })
} catch (error) {
    return res.status(500).json({
    success: false,
    message: error.message,
    })
}
}
  
  // Get a list of Course for a given Instructor
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
// Delete the Course
exports.deleteCourse = async (req, res) => {
try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
    return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
    await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
    })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
    // Delete sub-sections of the section
    const section = await Section.findById(sectionId)
    if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
        await SubSection.findByIdAndDelete(subSectionId)
        }
    }

    // Delete the section
    await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
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
  
