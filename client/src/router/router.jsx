import Auth from "@/authentication/auth/Auth";
import Login from "@/authentication/login/Login";
import Register from "@/authentication/register/Register";
import MainPage from "@/layouts/MainPage";
import AgentManage from "@/pages/admin/AgentManage";
import AllUserManage from "@/pages/admin/AllUserManage";
import CashRequest from "@/pages/admin/CashRequest";
import TrxHistory from "@/pages/admin/TrxHistory";
import WithdrawCash from "@/pages/admin/WithdrawCash";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Landing from "@/pages/Landing/Landing";
import UserTrx from "@/pages/user/UserTrx";
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
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        children: [
            // common dashboard router
            {
                path: '/dashboard',
                element: <UserStats />
            },
            // user dashboard router
            {
                path: "/dashboard/user-trx",
                element: <UserTrx/>
            },
            // agent dashboard router
            {
                path: "/dashboard/user-manage",
                element: <AllUserManage />
            },
            {
                path: "/dashboard/agent-manage",
                element: <AgentManage />
            },
            {
                path: "/dashboard/transactions",
                element: <TrxHistory />
            },
            {
                path: "/dashboard/cashRequest",
                element: <CashRequest />
            }, {
                path: "/dashboard/withdraw",
                element: <WithdrawCash />
            }
            // admin dashboard router
        ]
    }
])
export default router