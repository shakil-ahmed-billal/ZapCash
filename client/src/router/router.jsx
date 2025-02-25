import Auth from "@/authentication/auth/Auth";
import Login from "@/authentication/login/Login";
import Register from "@/authentication/register/Register";
import MainPage from "@/layouts/MainPage";
import Home from "@/pages/home/Home";
import Landing from "@/pages/Landing/Landing";
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
                element: <Home />
            }
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
    }
])
export default router