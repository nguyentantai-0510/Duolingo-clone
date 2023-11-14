import { Outlet, Link } from "react-router-dom";
import { useState, useCallback } from "react";
import useLogin from "../hooks/useLogin";

import "../assets/css/authIndex.css";
const AuthLayout = () => {
    const {googleAuth} = useLogin();
    const [authBtn, setauthBtn] = useState({ title: "Signup", url: "http://127.0.0.1:5173/auth/signup" });
    function handleClick() {
        setauthBtn(preAuthBtn => {
            if (preAuthBtn.title === "Signup") {
                return {
                    title: "Login",
                    url: "http://127.0.0.1:5173/auth/"
                }
            }
            return {
                title: "Signup",
                url: "http://127.0.0.1:5173/auth/signup"
            }
        })
    }
    const handleAuthGoogle = useCallback(() => {
        const mywindow = window.open('http://localhost:3000/api/users/google',
            'googleAuth',
            'width=500,height=500');
        const loop = setInterval(async () => {
            if (mywindow.closed) {
                clearInterval(loop)
                googleAuth();
            }
        }, 1000)
    }, [])
    return (
        <>
            <div className="auth__layout">
                <div className="auth__form">
                    <Outlet />
                    <Link to={authBtn.url}>
                        <div className="form__change">
                            <button onClick={handleClick}>
                                <span>{authBtn.title}</span>
                            </button>
                        </div>
                    </Link>
                    <div className="auth__options">
                        <div className="cross__line"></div>
                        <div className="options__title">Or login with</div>
                        <div className="cross__line"></div>
                    </div>
                    <div className="auth__option__btn">
                        <button
                            onClick={handleAuthGoogle}
                        >
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/7da752378a3b1b8bbcd94a4d4f10561e.svg" alt="" />
                            <span className="btn__google">Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;