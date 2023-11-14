import authReducer from "../pages/Auth/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
       auth: authReducer.reducer
    }
})
export default  store;