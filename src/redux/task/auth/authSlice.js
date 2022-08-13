import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    // user: {},
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // actions
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    },
})

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;