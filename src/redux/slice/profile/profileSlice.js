import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    data: [],
    error: {} 
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // actions
    },
})

export default profileSlice.reducer;

/*
 * Luego de crear un slice, se debe importar en el store 
 */
