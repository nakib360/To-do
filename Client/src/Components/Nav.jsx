import React from 'react';

const Nav = ({ setCreatePopUp }) => {
    return (
        <div>
            <div onClick={() => { setCreatePopUp(true) }} className='p-5 flex justify-center items-center font-bold bg-blue-400 hover:bg-blue-500 rounded-xl cursor-pointer'>
                + New
            </div>
        </div>
    );
};

export default Nav;