import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddProduct from "./pages/merchant/addProduct";
import ProductList from "./pages/user/ProductList";
import ListProductUser from "./pages/user/listPorduct";
import DetaiProduct from "./components/DetailProduct";
import DetailProductUser from "./components/DetailProductUser";

const checkLogin = () => {
    if(!localStorage.token){
        return redirect('/Login')
    }
    return null
}
const router = createBrowserRouter([
    {
        path: "/",
        element: < MainLayout key={1}/>,
        loader: checkLogin,
                
        children: [
            {
                path: '',
                element: <ListProductUser/>,
                loader: checkLogin
            },
            {
                path: "addproduct",
                element: <AddProduct/>
            },
            {
                path:  'merchantProducts',
                element: <ProductList/>
            },
            {
                path: 'detailProduct',
                element: <DetaiProduct/>
            },
            {
                path: '/detailProductUser',
                element: <DetailProductUser/>
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