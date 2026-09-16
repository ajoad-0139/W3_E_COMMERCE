import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState ={
    isLoggedIn:Boolean,
    jwt:string
}

const initialState = {
    isLoggedIn :false,
    jwt:''
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        logIn:(state, action:PayloadAction)=>{
            state.isLoggedIn=true;
            // state.jwt=action.payload
        }
    }

})



export default authSlice.reducer;