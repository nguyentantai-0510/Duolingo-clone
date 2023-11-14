import "../../assets/css/authIndex.css";
import pending from "../../assets/imgs/pending.gif";

import { useState } from "react";

const FormEmail = () => {
    const [isPending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({ status: false, title: "" });
    async function handleSubmit(e) {
        e.preventDefault();
        setPending(true);
        const req = await fetch("http://localhost:3000/api/users/sendmail", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email })
        })
        if (!req.ok) {
            console.error("Something went wrong while fetching");
        }
        const result = await req.json();
        if (result.mssg) {
            setPending(false);
            setStatus(preStatus => ({ ...preStatus, status: !preStatus.status, title: result.mssg }));
        }
        else {
            setError(result.error);
        }
        setPending(false);
    }
    function handleChange(e) {
        const newInput = e.target.value;
        setEmail(newInput);
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
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form__submit">
                    <button>Submit {isPending ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                </div>
            </form>
        </div>
    );
}

export default FormEmail;