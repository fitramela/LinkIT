import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddProduct from "./pages/merchant/addProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "addproduct",
                element: <AddProduct/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])
export default router