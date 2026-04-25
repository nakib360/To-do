import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

const ToDoPlayground = () => {
    const data = useLoaderData();
    const [toDoArray, setToDoArray] = useState([]);
    const [taskAdding, setTaskAdding] = useState(false);

    const newTaskAdding = (e) => {
        e.preventDefault();
        const task = e.target.newTask.value;
        const newToDoItem = {
            task: task,
            isCompleted: false
        }
        const res = axios.put(`http://127.0.0.1:4000/todo/${data._id}`, newToDoItem);
        console.log(res);
        setTaskAdding(false);
    }
    useEffect(() => {
        setToDoArray(data.toDos);
    }, [data]);
    console.log(toDoArray);
    return (
        <div className='space-y-4'>
            <p className='text-3xl uppercase'>{data.name}</p>
            {
                toDoArray.map((todo, idx) => (
                    <div key={idx} className='flex items-center gap-3'>
                        <div className='text-2xl'>
                            {
                                todo.isCompleted ? <FaRegCheckCircle /> : <MdOutlineRadioButtonUnchecked />
                            }
                        </div>
                        <p className='bg-white/10 w-full md:w-1/2 rounded-xl p-2'>{todo.task}</p>
                    </div>
                ))
            }
            {
                taskAdding ? (
                    <form onSubmit={newTaskAdding} className='flex flex-col gap-3'>
                        <input type="text" name='newTask' className='bg-white/10 w-full md:w-1/2 rounded-xl p-2 focus:outline-none' placeholder="what's new" />
                        <button type='submit' className='bg-white/10 w-full md:w-1/2 rounded-xl p-2 cursor-pointer hover:bg-white/20'>Add</button>
                    </form>
                ) : (
                    <button onClick={() => setTaskAdding(true)} className='bg-white/10 w-full md:w-1/2 rounded-xl p-2 cursor-pointer hover:bg-white/20'>Add Task</button>
                )
            }
        </div>
    );
};

export default ToDoPlayground;