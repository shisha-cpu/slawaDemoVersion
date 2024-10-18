import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {user:{
        basket : []
    }}, 
    reducers: {
        fetchUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateBasket:(state , action)=>{
            state.user.basket.push(action.payload);
        }
    }
});


export const { fetchUser , updateBasket } = userSlice.actions;


export default userSlice.reducer;
