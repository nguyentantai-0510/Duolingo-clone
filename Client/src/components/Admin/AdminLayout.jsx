import Navbar from "./Admin_Navbar/Navbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
    return ( 
        <div className="Layout">
        <Navbar/>
        <Outlet/>
        </div>
     );
}
 
export default AdminLayout;