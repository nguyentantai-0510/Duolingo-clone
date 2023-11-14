import "../../assets/css/user.css";
import { useState, useEffect, useRef, useContext } from "react";
import Blogs from "../Blogs/Blogs";
import pending from "../../assets/imgs/pending.gif";
// import { AuthContext } from "../../context/authReducer/authContext";
import { useSelector } from "react-redux";

import {useLogout} from "../../hooks/useLogout";
const UserDetail = () => {
    const  state  = useSelector(state => state.auth);
    const [isPending, setPending] = useState(false);
    const { token } = state.user;
    const [user, setUser] = useState(null);
    const [imageFile, setFile] = useState(null);
    const imageRef = useRef(null);
    const {logout}= useLogout();
    useEffect(() => {
        fetch(`http://localhost:3000/api/users/user/`,{
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                console.log("đây là : ",data);
                setUser(data);
            })
    }, [])
    function handleChange(e) {
        let files = e.target.files;
        const fr = new FileReader();
        fr.onload = function () {
            imageRef.current.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
        setFile(files[0]);
    }
    async function handleSubmitChange() {
        const form = new FormData();
        form.append("file", imageFile);
        setPending(true);
        const response = await fetch(`http://localhost:3000/api/users/user`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: form
            });
        const json = await response.json();
        if(json){
            setPending(false);
            setFile(false);
        }
    }
    function handleLogout(){
        logout();
    }
    return (
        <div className="user__container">
            {user && (
                <>
                    <div className="user__detail">
                        <div className="user__image">
                            <img src={user.image?.img_url ? user.image?.img_url:"https://simg-ssl.duolingo.com/avatars/493426927/ByiRst58qf/xxlarge"} alt="" ref={imageRef} />
                            <button className="user__change__image">
                                <label htmlFor="">
                                    <input
                                        type="file"
                                        className="input__file"
                                        onChange={e => handleChange(e)}
                                    />
                                </label>
                                <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/00e52dc386f5aeaef537e239c70739ab.svg" alt="" className="change__btn" />
                            </button>
                        </div>
                        <div className="user__info">
                            <div className="user__name">
                                <h2>{user.username}</h2>
                            </div>
                            <div className="user__email">
                                <span>{user.email}</span>
                            </div>
                            <div className="user__dayjoin">
                                <span>Joined <span> </span>
                                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toString()}
                                </span>
                            </div>
                            <div className="user__logout">
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                        <div className="confirm__change">
                            {imageFile && (
                                <button onClick={handleSubmitChange}>
                                    {isPending ?
                                        (<img
                                            src={pending}
                                            style={{ width: "53px", height: "10px", objectFit:"cover" }}>
                                        </img>)
                                        :
                                        "Save change"}
                                </button>)}
                        </div>
                    </div>
                    <hr />
                    <div className="user__blogs">
                        <h1 className="blogs__title">Blogs created</h1>
                        <Blogs/>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserDetail;