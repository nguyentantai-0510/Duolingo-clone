import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
const ResetLayout = () => {
    return (
        <div className="auth__layout">
            <div className="auth__form">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}

export default ResetLayout;