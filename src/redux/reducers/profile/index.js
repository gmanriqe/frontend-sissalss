import { combineReducers } from "@reduxjs/toolkit";

// reducer secundario
// import resultsReducer from "./results";

import {
    FETCH_PASSWORD_START,
    FETCH_PASSWORD_COMPLETE,
    FETCH_PASSWORD_ERROR
} from '../../../redux/actions/profile';

const initialState = {
    isLoading: false,
    data: [],
    error: {}
}

export default combineReducers({
    // debemos llamar a cada reducer secundarios declarados
    results: (state = initialState, action) => {
        switch (action.type) {
            case FETCH_PASSWORD_START:
                return { 
                    ...state, 
                    isLoading: true, 
                    data: []
                }
            case FETCH_PASSWORD_COMPLETE:
                return { 
                    ...state, 
                    isLoading: false, 
                    data: action.payload
                }
            case FETCH_PASSWORD_ERROR:
                return { 
                    ...state, 
                    isLoading: false, 
                    error: action.error
                }
            default:
                return state;
        }
    } // results será como tendrá el nombre en el store
})