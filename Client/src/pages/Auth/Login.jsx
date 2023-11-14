import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import pending from "../../assets/imgs/pending.gif";


const url = "http://localhost:3000/api/users/login";


const Login = () => {
    const { errors, login, isLoading } = useLogin();
    const [input, setInput] = useState({ inputField: "", password: "" });


    function handleChange(e) {
        const { name, value } = e.target;
        setInput(preInput => ({ ...preInput, [name]: value }));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        await login(url, input.inputField, input.password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {errors && <div className="error">{errors}</div>}
                <div className="form__input">
                    <input
                        type="text"
                        placeholder="email or username"
                        name="inputField"
                        value={input.input}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={input.input}
                        onChange={handleChange}
                    />
                    <Link to="/reset-password">
                        <div className="forget__password">
                            <span>Forgot password</span>
                        </div>
                    </Link>
                </div>
                <div className="form__submit">
                    <button> Login{isLoading ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;