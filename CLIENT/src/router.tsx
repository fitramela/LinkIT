import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddProduct from "./pages/merchant/addProduct";
import ProductList from "./pages/user/ProductList";
import ListProductUser from "./pages/user/listPorduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: < MainLayout key={1}/>,
                
        children: [
            {
                path: '',
                element: <ListProductUser/>
            },
            {
                path: "addproduct",
                element: <AddProduct/>
            },
            {
                path:  'merchantProducts',
                element: <ProductList/>
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