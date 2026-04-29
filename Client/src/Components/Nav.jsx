import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:4000");

const Nav = ({ setCreatePopUp, setShowMenu }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:4000/todo")
            .then(res => setData(res.data));
    }, []);

    useEffect(() => {
        // সার্ভার থেকে 'todo-added' ইভেন্ট আসলে ডাটা আপডেট হবে
        socket.on("todo-added", (newTodo) => {
            setData((prevData) => [...prevData, newTodo]);
        });

        // কম্পোনেন্ট আনমাউন্ট হলে লিসেনার বন্ধ করে দেওয়া (Cleanup)
        return () => {
            socket.off("todo-added");
        };
    }, []);
    // console.log(data);
    return (
        <div>
            <div onClick={() => { setCreatePopUp(true), setShowMenu(false) }} className='p-5 flex justify-center items-center font-bold bg-blue-400 hover:bg-blue-500 rounded-xl cursor-pointer'>
                + New
            </div>

            <div className='mt-5 space-y-4 overflow-y-scroll overflow-hidden scrollbar-hide max-h-[50vh] md:max-h-[82vh]'>
                {
                    data.map(todo => (
                        <div key={todo._id} onClick={() => setShowMenu(false)}>
                            <NavLink to={`/${todo._id}`}  className={({isActive}) => isActive ? "bg-white/30 block w-full rounded-xl p-2 cursor-pointer hover:bg-white/20" : "bg-white/10 block w-full rounded-xl p-2 cursor-pointer hover:bg-white/20"}>
                                    <p>{todo.name}</p>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Nav;