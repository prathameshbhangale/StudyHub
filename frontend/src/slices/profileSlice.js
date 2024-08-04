import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  // { firstName, lastName, email, password, confirmPassword, accountType , imageLink }
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer