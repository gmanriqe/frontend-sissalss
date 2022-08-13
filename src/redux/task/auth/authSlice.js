import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {},
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // actions
    },
})

// export const {  } = AuthSlice.actions;

export default authSlice.reducer;