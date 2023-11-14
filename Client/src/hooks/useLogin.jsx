import { useContext, useState } from "react";
// import * as actions from "../context/authReducer/action";
// import { AuthContext } from "../context/authReducer/authContext";
import { useDispatch } from 'react-redux';
import {authActions} from "../pages/Auth/AuthSlice";
export default function useLogin(){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);
    const [isLoading, setLoading] = useState(null);
    // const {dispatch} = useContext(AuthContext);
    const login = async (url, username, password, email ="") => {
        setLoading(true);
        setErrors(null);
        const respone = await fetch(url,{
            crossDomain:true,
            method:"POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({username, password, email})
        })
        const json = await respone.json();
        if (!respone.ok) {
            console.log(json);
            setLoading(false);
            setErrors(json.error);
        }
        if(respone.ok){
            setLoading(true);
            //  save user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update auth context
            dispatch(authActions.loginAuth(json))
            setLoading(false);
        }
    }
    const adminLogin = async(url, username, signature) =>{
        setLoading(true);
        setErrors(null);
        const respone = await fetch(url,{
            crossDomain:true,
            method:"POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({username, signature})
        })
        const json = await respone.json();
        if (!respone.ok) {
            console.log(json);
            setLoading(false);
            setErrors(json.error);
        }
        if(respone.ok){
            setLoading(true);
            //  save user to local storage
            localStorage.setItem('admin', JSON.stringify(json));
            dispatch(authActions.loginAdmin(json));
            setLoading(false);
        }
    }
    const googleAuth = async ()=>{
        const res = await fetch("http://localhost:3000/api/users/google/success");
        const json = await res.json();
        localStorage.setItem('user', JSON.stringify(json));
        dispatch(authActions.loginAuth(json));
        window.location.reload();
    }
    return{errors, login, isLoading, googleAuth, adminLogin};
}