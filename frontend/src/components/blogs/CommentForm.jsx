import React, { useState } from 'react';

const CommentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        setFormData({ name: '', email: '', subject: '', comment: '' });
    };

    return (
        <div className="bg-gray-100 text-white p-6 rounded-xl mt-12 max-w-3xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-[#00B8A9] mb-2">Leave a Reply</h2>
            <p className="text-sm text-black mb-6">Your email address will not be published. Required fields are marked *</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Your Comment *"
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-lt text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                ></textarea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name *"
                        required
                        className="w-full px-4 py-2 bg-lt text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        required
                        className="w-full px-4 py-2 bg-lt text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                    />
                </div>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-2 bg-lt text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                />
                <button
                    type="submit"
                    className="bg-[#00B8A9] text-white font-semibold px-6 py-2 rounded-md  hover:bg-[#009688] shadow transition-all duration-500 hover:cursor-pointer"
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
