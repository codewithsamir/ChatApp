import {createSlice} from "@reduxjs/toolkit"


const registerSlice = createSlice({
    name: 'registeractive',
    initialState:{
        isActivelogin:false,
        isActivesignup:false,
   isActiveforgotpassword:false,
   isActiveotp:false,

    },
    reducers:{
        loginActive:(state,action)=>{
                state.isActivelogin = action.payload
        },
        signupActive:(state,action)=>{
                state.isActivesignup = action.payload
        },
       
        forgotpasswordActive:(state,action)=>{
                state.isActiveforgotpassword = action.payload
        },
        otpactive:(state,action)=>{
                state.isActiveforgotpassword = action.payload
        },
    }
})


export const {loginActive,signupActive,forgotpasswordActive,otpactive} = registerSlice.actions

export default registerSlice.reducer