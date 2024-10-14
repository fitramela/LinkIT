import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>
    }
])
export default router