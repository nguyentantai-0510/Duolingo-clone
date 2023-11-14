import { useState, useContext } from "react";
// import {AuthContext} from "../context/authReducer/authContext"
import { useSelector } from "react-redux";

export default function useBlog(){
    const  state  = useSelector(state => state.auth);
    const {token} = state.user;
    const [errors, setErrors] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const postBlog = async (url, title, snippet, body ="") => {
        setLoading(true);
        setErrors(null);
        const respone = await fetch(url,{
            crossDomain:true,
            method:"POST",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({title, snippet, body})
        })
        const json = await respone.json();
        if (!respone.ok) {
            console.log(json);
            setLoading(false);
            setErrors(json.error);
        }
        if(respone.ok){
            setLoading(true);
            setLoading(false);
        }
    }
    const editBlog = async (url, data)=>{
        setLoading(true);
        setErrors(null);
        const res = await fetch(url,
        {
            method:"POST",
            headers: { "Authorization": `Bearer ${token}` , "content-type": "application/json"},
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (!res.ok) {
            console.log(json);
            setLoading(false);
            setErrors(json.error);
        }
        if(res.ok){
            setLoading(true);
            setLoading(false);
        }
    }
    return{errors, postBlog, isLoading, editBlog};
}