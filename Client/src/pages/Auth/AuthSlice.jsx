import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user: JSON.parse(localStorage.getItem('user')),
        admin: JSON.parse(localStorage.getItem('admin'))
    },
    reducers:{
        loginAuth:(state, action)=>{
            return {
                ...state,
                user:action.payload
            }
        },
        loginAdmin:(state, action)=>{
            return{
                ...state,
                admin: action.payload
            }
        },
        logoutAuth:(state, action)=>{
            return{
                ...state,
                user:null
            }
        }
    }
})
export default authSlice;
export const authActions = authSlice.actions;