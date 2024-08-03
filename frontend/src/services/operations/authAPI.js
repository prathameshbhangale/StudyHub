import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";

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