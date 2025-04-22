import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineNavigateNext } from 'react-icons/md';
import InnerBlogDetail from './InnerBlogDetail';
import blogs from './blogData';
import Shop from './Shop';


const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogs.find(blog => blog.id === parseInt(id));

    const currentIndex = blogs.findIndex(b => b.id === blog.id);
    const nextBlogs = blogs.slice(currentIndex + 1, currentIndex + 3);

    if (!blog) {
        return (
            <div className="text-center text-xl txt-gd mt-10">
                Blog not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dk text-white px-2 md:px-4 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-base font-medium mb-6 flex-wrap sticky top-0 z-10 bg-dk/80 py-2 backdrop-blur-sm rounded-md px-3">
                <button onClick={() => navigate('/')} className="txt-lt hover-gl transition">Home</button>
                <MdOutlineNavigateNext className="txt-gl" />
                <button onClick={() => navigate('/blogs')} className="txt-gl hover-gl transition">Blogs</button>
                <MdOutlineNavigateNext className="txt-gl" />
                <span className="txt-gd line-clamp-1">{blog.title.slice(0, 30)}...</span>
            </div>

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Main Blog Image with Category Overlay */}
                <div className="relative w-full h-64 md:h-[500px]">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-dk txt-gl px-3 py-1 rounded-full text-sm font-semibold shadow">
                        {blog.category}
                    </span>
                </div>

                {/* Blog Content */}
                <div className="px-1 py-4 md:px-8 md:py-8 text-black">
                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            {blog.authorImg && (
                                <img
                                    src={blog.authorImg}
                                    alt={blog.author}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-dk"
                                />
                            )}
                            <div>
                                <h4 className="font-semibold text-base text-gray-800">{blog.author}</h4>
                                <p className="text-sm txt-gd">{blog.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Title */}
                    <h1 className="text-2xl md:text-3xl font-bold txt-gd mb-6 text-center">{blog.title}</h1>

                    {/* Content */}
                    <p className="text-base leading-7 text-justify tracking-wide">
                        {blog.content || "This blog post does not contain detailed content yet."}
                    </p>

                    {/* InnerBlogDetail Component */}
                    <div className='my-4'>
                        <InnerBlogDetail image={blog.innerImage} title={blog.innerTitle} content={blog.innerContent} />
                    </div>

                    <div className='h-full'>
                        <Shop />
                    </div>

                </div>

            </div>

            {/* Related / Next Blogs */}
            {nextBlogs.length > 0 && (
                <div className="max-w-6xl mx-auto mt-12">
                    <h2 className="text-xl md:text-2xl font-bold txt-gl mb-6">Next Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {nextBlogs.map(nextBlog => (
                            <div
                                key={nextBlog.id}
                                onClick={() => navigate(`/blogs/${nextBlog.id}`)}
                                className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src={nextBlog.image}
                                    alt={nextBlog.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4 text-black">
                                    <span className="text-xs bg-dk txt-gl px-2 py-1 rounded-full">{nextBlog.category}</span>
                                    <h3 className="mt-2 font-semibold text-lg line-clamp-2">
                                        {nextBlog.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">{nextBlog.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

export default BlogDetail;
