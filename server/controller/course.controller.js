import Course from "../model/course.js"
import Category from "../model/category.js"
import User from "../model/user.js"

exports.createCourse = async (req, res) => {
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
