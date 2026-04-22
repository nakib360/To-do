import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Nav = ({ setCreatePopUp }) => {
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         axios.get("http://127.0.0.1:4000/todo")
    //             .then(res => setData(res.data));
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, []);
    // console.log(data);
    return (
        <div>
            <div onClick={() => { setCreatePopUp(true) }} className='p-5 flex justify-center items-center font-bold bg-blue-400 hover:bg-blue-500 rounded-xl cursor-pointer'>
                + New
            </div>

            <div className='mt-5 space-y-4'>
                {
                    data.map(todo => (
                        <div key={todo._id} className='bg-white/10 rounded-xl p-2 cursor-pointer hover:bg-white/20'>
                            <p>{todo.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Nav;