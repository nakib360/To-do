import { Outlet } from "react-router";
import Nav from "./Nav";

const Main = () => {
    return (
        <div className="bg-black min-h-screen text-white grid grid-cols-12">
            <div className="col-span-2 p-4 border-r border-gray-300">
                <Nav />
            </div>

            <div className="col-span-10 p-4">
                <Outlet />
            </div>

        </div>
    );
};

export default Main;