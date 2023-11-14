import { Outlet} from "react-router-dom";

import "../../assets/css/authIndex.css";
const AdminAuthLayout = () => {
    return (
        <>
            <div className="auth__layout">
                <div className="auth__form">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default AdminAuthLayout;