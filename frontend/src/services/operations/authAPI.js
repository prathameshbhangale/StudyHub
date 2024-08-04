import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

export async function sendOtp(email, navigate,dispatch){
    dispatch(setLoading(true))
    const id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(id)
}

export async function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate,
    dispatch
){
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        console.log(SIGNUP_API)
    const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
    })

    console.log("SIGNUP API RESPONSE............", response)

    if (!response.data.success) {
        throw new Error(response.data.message)
    }
    toast.success("Signup Successful")
    navigate("/login")
    } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}

export async function login(email, password, navigate , dispatch) {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
    const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
    })

    console.log("LOGIN API RESPONSE............", response)

    if (!response.data.success) {
        throw new Error(response.data.message)
    }
    console.log(response)
    toast.success("Login Successful")
    dispatch(setToken(response.data.token))
    const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
    dispatch(setUser({ ...response.data.user, image: userImage }))
    localStorage.setItem("token", JSON.stringify(response.data.token))
    navigate("/")
    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}

export function logout(navigate , dispatch) {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}