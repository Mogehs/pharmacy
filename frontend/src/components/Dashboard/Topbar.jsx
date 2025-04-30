import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-20 h-16 w-full bg-dk text-white shadow-md px-4 flex md:flex-row flex-row-reverse items-center justify-between">
            <h2 className="text-xl font-semibold font-Fredoka text-[#00B8A9] md:text-[#fff] hover:cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</h2>
            <div className="text-sm text-white md:block hidden">Welcome back, Admin!</div>
        </header>
    );
};

export default Topbar;
