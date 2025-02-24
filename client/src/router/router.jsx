import MainPage from "@/layouts/MainPage";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])
export default router