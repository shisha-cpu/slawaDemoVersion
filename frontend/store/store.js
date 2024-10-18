import { configureStore } from "@reduxjs/toolkit";
import userReducer from'./slices/userSlice.js'
import priceSlice from'./slices/priceSlice.js'
export const store= configureStore({
    reducer:{
        user: userReducer,
        price : priceSlice
    }
}) 