import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import pending from "../../assets/imgs/pending.gif";
const url = "http://localhost:3000/api/users/signup";
const Signup = () => {
    const { errors, login, isLoading } = useLogin();
    const [input, setInput] = useState({ username: "", email: "", password: "" });
    function handleChange(e) {
        const { name, value } = e.target;
        setInput(preInput => ({ ...preInput, [name]: value }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await login(url ,input.username, input.password, input.email);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                {errors && <div className="error">{errors}</div>}
                <div className="form__input">
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
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
                </div>
                <div className="form__submit">
                    <button> Signup{isLoading ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;