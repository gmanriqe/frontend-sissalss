import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

export const customerSlice = createSlice({
    name: "$customers",
    initialState,
    reducers: {
        /*
        // actions LIST
        AddCustomer: (state, action) => {
            console.log(state, action)
        }
        */

        // actions LIST
        listCustomer: (state, action) => {
            // return [...state, action.payload]
            return {
                ...state,
                data: action.payload
            }
        }
    },
})

// this is for dispatch
export const { listCustomer } = customerSlice.actions;

// this is for configureStore
export default customerSlice.reducer;


/*
 * Luego de crear un slice, se debe importar en el store 
 */
