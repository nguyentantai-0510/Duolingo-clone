import { useContext, } from "react";
import * as actions from "../context/authReducer/action";
// import { AuthContext } from "../context/authReducer/authContext";
import { useDispatch } from "react-redux";
import {authActions} from "../pages/Auth/AuthSlice";

export function useLogout() {
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem("user");
        dispatch(authActions.logoutAuth());
    }
    // some stuffs
    return {logout};
}