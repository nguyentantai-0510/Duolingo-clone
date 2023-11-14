import { initState, reducer } from "./reducer";
import { createContext, useReducer, useEffect } from "react";
import * as action from "./action";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const admin = JSON.parse(localStorage.getItem('admin'));
        dispatch(action.authLogin(user));
        dispatch(action.adminAuthLogin(admin));
    }, [])
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;