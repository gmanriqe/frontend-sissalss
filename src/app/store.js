import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/task/auth/authSlice';
import profileReducer from '../redux/task/profile/profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer, // 1er reducer
        profile: profileReducer, // 2do reducer
    }
});