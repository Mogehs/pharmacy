import React from 'react';
import BlogCards from './BlogCards';
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Blogs() {
    const navigate = useNavigate();
    return (
        <div className="px-4 py-10">
            <div className="flex items-center gap-2 text-lg md:text-xl font-semibold text-white mb-6">
                <button onClick={() => navigate("/")} className="text-black hover:text-[#009688] transition-colors hover:cursor-pointer">Home</button>
                <MdOutlineNavigateNext className="text-[#00B8A9]" />
                <button onClick={() => navigate(`/blogs`)} className="text-[#00B8A9] hover:text-[#009688] transition-colors hover:cursor-pointer">Blogs</button>
            </div>

            <BlogCards />
        </div>
    );
}

export default Blogs;
