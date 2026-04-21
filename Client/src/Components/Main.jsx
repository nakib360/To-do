import { Outlet } from "react-router";
import Nav from "./Nav";
import { useState } from "react";

const Main = () => {
    const [createPopUp, setCreatePopUp] = useState(false);
    const newToDoName = async (e) => {
        await e.preventDefault();
        const newToDo = e.target.toDoName.value;
        await console.log(newToDo);
        await setCreatePopUp(false);
    }
    return (
        <div className="relative bg-black min-h-screen text-white grid grid-cols-12">
            <div className="col-span-2 p-4 border-r border-gray-300">
                <Nav setCreatePopUp={setCreatePopUp} />
            </div>

            <div className="col-span-10 p-4">
                <Outlet />
            </div>

            {
                createPopUp ? (
                    <div className=" backdrop-blur-sm absolute text-black inset-0 flex justify-center items-center">
                        <form onSubmit={newToDoName} className="bg-gray-600 flex flex-col justify-center items-center gap-5 p-10 rounded-3xl">
                            <input className="bg-black text-white p-5 rounded-xl outline-0 focus:outline-0" placeholder="Enter New To Do Name" type="text" name="toDoName" />
                            <button type="submit" className="bg-blue-400 hover:bg-blue-500 rounded-xl p-3 text-white cursor-pointer">Create new To Do</button>
                        </form>
                    </div>
                ) : (
                    ""
                )
            }
        </div>
    );
};

export default Main;