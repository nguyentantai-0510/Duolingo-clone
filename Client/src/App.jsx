import Layout from "./components/Laytout";
import Questions from "./pages/Questions/Questions";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./components/AuthLayout";
import { useAuthContext } from "./hooks/useAuthContext";
import ResetLayout from "./components/ResetLayout";
import Quizs from "./pages/Quizs/Quizs";
import FormEmail from "./pages/ForgotPassword/FormEmail";
import FormReset from "./pages/ForgotPassword/FormReset";
import Blogs from "./pages/Blogs/Blogs";
import BlogCreate from "./pages/Blogs/BlogCreate";
import BlogDetail from "./pages/Blogs/BlogDetail";
import UserDetail from "./pages/User/UserDetail";
import AdminLayout from "./components/Admin/AdminLayout";
import "./assets/css/app.css"
import Page404 from "./pages/Page404";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminAuthLayout from "./components/Admin/AuthLayout";
import AdminQuestions from "./pages/Admin/AdminQuestion";
import AdminAllQuestions from "./pages/Admin/AdminAllQuestions";
import AdminUserDonations from "./pages/Admin/AdminUserDonations";
import { useSelector } from "react-redux";


function App() {
  const authSelector = useSelector(state =>state.auth); 
  const  state  = authSelector;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={state.user ? <Layout /> : <Navigate to="auth" />}>
            <Route index element={<Quizs />} />
            <Route path="learn/unit/" element={<Questions />} />
            <Route path="blogs" >
              <Route index element={state.user ? <Blogs /> : <Navigate to="auth" />} />
              <Route path="create" element={<BlogCreate />}></Route>
              <Route path="blog/:id" element={<BlogDetail />} />
            </Route>
            <Route path="user" element={<UserDetail />} />
          </Route>

          <Route path="/reset-password" element={<ResetLayout />}>
            <Route index element={<FormEmail />} />
            <Route path="change-password" element={<FormReset />} />
          </Route>

          <Route path="auth" element={!state.user ? <AuthLayout /> : <Navigate to="/" />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          
          <Route path="admin-auth" element={!state.admin ? <AdminAuthLayout/> : <Navigate to="/admin" />}>
              <Route index element ={<AdminAuth/> }></Route>
          </Route>
            <Route path="/admin" element={state.admin ? <AdminLayout /> : <Navigate to="/admin-auth" />}>
            <Route index element={<AdminQuestions/>} />
            <Route path="questions" element={<AdminAllQuestions/>}/>
            <Route path="donation" element={<AdminUserDonations/>}/>
          </Route>
          <Route path="*" element ={<Page404/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
