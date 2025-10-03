import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./LoginPage";
import OtpPage from "./OtpPage";
import Dashboard from "./Dashboard";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element:<LoginPage/>
        },
        {
            path:"/otp",
            element:<OtpPage/>
        },
        {
            path:"/dashboard",
            element:<Dashboard/>
        }
    ])
    return (
        <RouterProvider router={appRouter}/>
    )
}

export default Body;