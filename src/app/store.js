import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/task/auth/authSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});