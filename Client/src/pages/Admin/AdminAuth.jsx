import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import pending from "../../assets/imgs/pending.gif";
const AdminAuth = () => {
    const { errors, isLoading, adminLogin } = useLogin();
    const [input, setInput] = useState({ username: "", adminCode: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(preInput => ({ ...preInput, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await adminLogin("http://localhost:3000/api/admin/signin", input.username, input.adminCode);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                {errors && <div className="error">{errors}</div>}
                <div className="form__input">
                    <input
                        type="text"
                        placeholder="user name"
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="signature code"
                        name="adminCode"
                        value={input.adminCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form__submit">
                    <button> Login{isLoading ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                </div>
            </form>
        </div>
    );
}

export default AdminAuth;