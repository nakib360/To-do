import { NavLink, Outlet, useNavigate } from "react-router";
import axios from "axios";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";

const Main = () => {
    const [createPopUp, setCreatePopUp] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [insertId, setInsertId] = useState([]);
    const navigate = useNavigate();
    const newToDoName = async (e) => {
        await e.preventDefault();
        const newToDoName = e.target.toDoName.value;
        const newToDo = {
            name: newToDoName,
            toDos: []
        }
        const res = await axios.post("http://127.0.0.1:4000/todo", newToDo)
        setInsertId(res.data.insertedId);
        setCreatePopUp(false);
    }

    useEffect(() => {
        navigate(`/${insertId}`);
    }, [insertId]);
    return (
        <div className="relative bg-black min-h-screen text-white md:grid md:grid-cols-12">
            <div className="hidden md:block col-span-2 p-4 border-r border-gray-300">
                <Nav setCreatePopUp={setCreatePopUp} />
            </div>

            <div className="relative md:col-span-10 p-4">
                <div onClick={() => setShowMenu(!showMenu)} className="md:hidden absolute right-4 text-2xl">
                    <RiMenu3Fill />
                </div>
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

            {
                showMenu ? (
                    <div className="max-h-[80vh] absolute md:hidden top-12 right-4 bg-gray-800 rounded-xl p-4 w-2/3 border-gray-300">
                        <Nav setCreatePopUp={setCreatePopUp} setShowMenu={setShowMenu}/>
                    </div>
                ) : (
                    ""
                )
            }
        </div>
    );
};

export default Main;