import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const blogs = [
    // Add more blogs here if needed
    {
        id: 1,
        title: "Solving today’s prenatal vitamin problem. 2022 Tips",
        category: "Community Impact",
        image: "/blogs/post1.jpg",
        date: "Apr 12, 2025"
    },
    {
        id: 2,
        title: "COVID-19 most frequently asked questions",
        category: "Pharmacy & Healthcare",
        image: "/blogs/post2.jpg",
        date: "Apr 10, 2025"
    },
    {
        id: 3,
        title: "Exit Pharmacy Business and Transition Pharmacy Services",
        category: "Insights",
        image: "/blogs/post3.jpg",
        date: "Apr 08, 2025"
    },
    {
        id: 4,
        title: "The secret Santas of the holiday supply chain",
        category: "Insights",
        image: "/blogs/post4.jpg",
        date: "Apr 08, 2025"
    },
    {
        id: 5,
        title: "Propharm Announces New Bonuses and Rewards",
        category: "Insights",
        image: "/blogs/post5.jpg",
        date: "Apr 08, 2025"
    },
    {
        id: 6,
        title: "Propharm Brings Hundreds of Off-Site Vaccination Clinics",
        category: "Vaccines",
        image: "/blogs/post6.jpg",
        date: "Apr 08, 2025"
    },
    {
        id: 7,
        title: "New Pharmacy Management Techniques in 2025",
        category: "Management",
        image: "/blogs/post1.jpg",
        date: "Apr 05, 2025"
    },
    {
        id: 8,
        title: "AI Impact in Healthcare: Latest Trends",
        category: "Technology",
        image: "/blogs/post2.jpg",
        date: "Apr 04, 2025"
    },
];

function BlogCards() {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    // Pagination calculations
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    return (
        <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                    >
                        <div className="relative">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105 p-2 rounded-2xl"
                            />
                            <div className="absolute top-4 left-4 bg-dk txt-gl px-3 py-1 rounded-md text-sm font-semibold shadow">
                                {blog.date}
                            </div>
                        </div>

                        <div className="px-5 py-4 flex flex-col gap-3">
                            <div className="inline-block bg-dk txt-gl text-xs font-medium px-3 py-1 rounded-full w-fit shadow hover:brightness-110 transition duration-300">
                                {blog.category}
                            </div>

                            <h2 className="txt-gd text-lg font-semibold leading-snug line-clamp-2">
                                {blog.title.length > 40 ? `${blog.title.substring(0, 40)}...` : blog.title}
                            </h2>

                            <Link to="/blogs">
                                <button className="flex items-center gap-2 txt-lt font-medium hover-gl transition-colors duration-300">
                                    Read More
                                    <FaArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 
                            ${currentPage === i + 1 ? 'bg-dk txt-gl' : 'bg-white txt-gd hover:bg-dk hover:txt-gl'}
                        `}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BlogCards;
