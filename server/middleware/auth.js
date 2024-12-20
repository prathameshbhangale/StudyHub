import jwt, { decode } from 'jsonwebtoken'
import User from '../model/user.js'

function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token is expired');
        } else {
            console.error('Error decoding token:', error);
        }
        return null
    }
}
// token payload = {id, email, accountType}
// validation part of token
// either present in cookie or body or authentation
// export const auth = async(req,res,next) => {
//     try {
//         let token = req.body || req.cookies.token || req.header('Authorization')
//         if(!token){
//             return res.status(400).json({
//                 success:false,
//                 message:"token not found login again"
//             })
//         }
//         const decoded = decodeToken(token)
//         console.log(decoded)
//         if(!decoded){
//             return res.status(400).json({
//                 success:false,
//                 message:"unable to decode token plz login again"
//             })
//         }
//         let user = await User.findById(decoded.id)
        
//         req.user = user
//         next()
//     } catch (err) {
//         console.log("error in authentation form middleware",err.message)
//         return res.status(400).json({
//             success:false,
//             message:"error in authentation form middleware"
//         })
//     }
// }

export const auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header('Authorization')

		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.user = decode;
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
}

export const isStudent = async (req,res,next) => {
    try {
		const userDetails = await User.findOne({ email: req.user.email })

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			})
		}
		next()
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` })
	}
}

export const isAdmin = async (req,res,next) => {
    try {
		const userDetails = await User.findOne({ email: req.user.email })

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			})
		}
		next()
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` })
	}
}

export const isInstructor = async (req,res,next) => {
    try {
		const userDetails = await User.findOne({ email: req.user.email })

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			})
		}
		next()
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` })
	}
}