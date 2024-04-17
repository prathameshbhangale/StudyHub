import Category from "../model/category.js"
import Course from "../model/course.js"

export const createCategory = async (req, res) => {
    try {

        const {name, description} = req.body
        if(!name) {
            return res
                .status(404)
                .json({
                success: false,
                message: 'All fields are required'
            })
        }
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        })
        console.log(CategoryDetails)
        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully',
            data:CategoryDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {}, 
            {name: true, description: true}
        );
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            data: allCategories,
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const categoryPageDetails = async (req, res) => {
    try {
        const {categoryId} = req.body
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            })
        }
        const differentCategories = await Category.find({
                                    _id:  {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        const topSellingCourses = await Course.find({
            category: categoryId, 
        })
        .sort({ studentsEnrolled : -1 })

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
            }
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}