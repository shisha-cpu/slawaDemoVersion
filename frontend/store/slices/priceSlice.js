import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const priceSlice = createSlice({
    name: 'price',
    initialState: 0, 
    reducers: {
        updatePrice: (state, action) => {
            return state = action.payload
        },

    }
});


export const { updatePrice  } = priceSlice.actions;


export default priceSlice.reducer;
