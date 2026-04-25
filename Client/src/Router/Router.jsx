import { createBrowserRouter } from "react-router";
import App from "../App"
import Main from "../Components/Main";
import ToDoPlayground from "../Components/ToDoPlayground";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Main,
        children: [
            {
                path: "/:id",
                Component: ToDoPlayground,
                loader: ({ params }) => fetch(`http://127.0.0.1:4000/todo/${params.id}`)
            }
        ]
    }
]);

export default router;