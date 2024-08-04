// export const BASE_URL = import.meta.env.REACT_APP_BASE_URL
export const BASE_URL = "http://localhost:4000"

export const categories = {
    
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendOTP",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "",
    RESETPASSWORD_API: BASE_URL + "",
  }