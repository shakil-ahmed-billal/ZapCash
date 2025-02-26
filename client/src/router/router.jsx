import Auth from "@/authentication/auth/Auth";
import Login from "@/authentication/login/Login";
import Register from "@/authentication/register/Register";
import MainPage from "@/layouts/MainPage";
import AgentManage from "@/pages/admin/AgentManage";
import AllUserManage from "@/pages/admin/AllUserManage";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Landing from "@/pages/Landing/Landing";
import UserStats from "@/pages/UserStats";
import PrivateRouter from "@/private/PrivateRouter";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: "/home",
                element: <PrivateRouter><Home /></PrivateRouter>
            },

        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            // common dashboard router
            {
                path: '/dashboard',
                element: <UserStats />
            },
            // user dashboard router
            {

            },
            // agent dashboard router
            {
                path: "/dashboard/user-manage",
                element: <AllUserManage />
            },
            {
                path: "/dashboard/agent-manage",
                element: <AgentManage />
            }
            // admin dashboard router
        ]
    }
])
export default router