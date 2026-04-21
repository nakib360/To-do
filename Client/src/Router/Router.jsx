import { createBrowserRouter } from "react-router";
import App from "../App"
import Main from "../Components/Main";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Main
    }
]);

export default router;