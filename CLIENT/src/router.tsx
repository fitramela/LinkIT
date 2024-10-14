import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])
export default router