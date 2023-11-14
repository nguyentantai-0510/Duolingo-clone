import "../../assets/css/authIndex.css";
import pending from "../../assets/imgs/pending.gif";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const FormReset = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isPending, setPending] = useState(false);
    const [password, setPassword] = useState({newPassword:"", confirmPassword:""});
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({ status: false, title: "" });
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        if(password.newPassword !== password.confirmPassword){
            setError("New password is not equal with confirm password");
            return;
        }
        const userId = searchParams.get("id");
        setPending(true);
        const req = await fetch("http://localhost:3000/api/users/reset-password", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: userId, password: password.newPassword })
        })
        if (!req.ok) {
            console.error("Something went wrong while fetching");
        }
        const result = await req.json();
        if (result.mssg) {
            setPending(false);
            setStatus(preStatus => ({ ...preStatus, status: !preStatus.status, title: result.mssg }));
            setTimeout(()=>{
                navigate("/auth")
            },1500)
        }
        else {
            setError(result.error);
        }
        setPending(false);
    }
    function handleChange(e) {
        const {name, value} = e.target;
        console.log({name, value});
        setPassword(prePassword =>({...prePassword, [name]:value}));
    }
    return (
        <div>
            {status.status && <h1>{status.title}</h1>}
            <form onSubmit={handleSubmit} style={status.status ? { display: "none" } : {}}>
                <h1>
                    Reset password
                </h1>
                {error && <div className="error">{error}</div>}
                <div className="form__input">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password.newPassword}
                        onChange={handleChange}
                        name="newPassword"
                    />
                </div>
                <div className="form__input">
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={password.confirmPassword}
                        onChange={handleChange}
                        name = "confirmPassword"
                    />
                </div>
                <div className="form__submit">
                    <button>Submit {isPending ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                </div>
            </form>
        </div>
    );
}

export default FormReset;