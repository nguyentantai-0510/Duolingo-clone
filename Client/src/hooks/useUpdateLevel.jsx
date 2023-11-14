
import { useContext, useState } from "react";
import * as actions from "../context/authReducer/action";
// import { AuthContext } from "../context/authReducer/authContext";
import { useSelector } from "react-redux";
export default function useUpdateLevel(){
    const [errors, setErrors] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const state = useSelector(state => state.auth);
    const  {admin}  = state;
    const submitChange = async(questions = null, level = null, option, question, type, url = "http://localhost:3000/api/levels/updateQuestionLevel") =>{
        setLoading(true);
        setErrors(null);
        const respone = await fetch(url,{
            crossDomain:true,
            method:"POST",
            headers:{
                "content-type": "application/json",
                 "Authorization": `Bearer ${admin}` 
            },
            body: JSON.stringify({questions, level, option, question, type})
        })
        const json = await respone.json();
        if (!respone.ok) {
            setLoading(false);
            setErrors(json.error);
        }
        if(respone.ok){
            setLoading(true);
            setLoading(false);
        }
    }
    return {submitChange,errors,isLoading};
}