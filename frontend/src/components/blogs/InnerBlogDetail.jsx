import React from 'react'

const InnerBlogDetail = ({ image, title, content }) => {
    return (
        <div className="">
            <div className="relative w-full h-64 md:h-[400px]">
                <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#00B8A9] mb-6 text-start">{title}</h1>

                {/* Content */}
                <p className="text-base leading-7 text-justify tracking-wide">
                    {content || "This blog post does not contain detailed content yet."}
                </p>
            </div>

            <div className='h-px bg-[#00B8A9] mt-4'></div>

        </div>
    )
}

export default InnerBlogDetail