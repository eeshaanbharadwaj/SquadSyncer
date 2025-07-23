import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import mainReducer from './mainSlice'

const store=configureStore({

    reducer:{
        auth:authReducer,
        main:mainReducer,
    },
});

export default store;