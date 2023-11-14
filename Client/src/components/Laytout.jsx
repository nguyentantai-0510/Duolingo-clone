import Navbar from "../components/Navbar/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return ( 
        <div className="Layout">
        <Navbar/>
        <Outlet/>
        </div>
     );
}
 
export default Layout;