import React from 'react';
import BlogCards from './BlogCards';
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Blogs() {
    const navigate = useNavigate();
    return (
        <div className="mt-4 bg-dk px-4 py-10">
            <div className="flex items-center gap-2 text-lg md:text-xl font-semibold text-white mb-6">
                <button onClick={() => navigate("/")} className="txt-lt hover-gl transition-colors">Home</button>
                <MdOutlineNavigateNext className="txt-gl" />
                <button onClick={() => navigate(`/blogs`)} className="txt-gl hover-gl transition-colors">Blogs</button>
            </div>

            <BlogCards />
        </div>
    );
}

export default Blogs;
