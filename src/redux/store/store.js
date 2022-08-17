import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slice/auth/authSlice';
import profileReducer from '../reducers/profile';

export const store = configureStore({
    reducer: {
        auth: authReducer, // 1er reducer
        profile: profileReducer, // 2do reducer  
    }
});