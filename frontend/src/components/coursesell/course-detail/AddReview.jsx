import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdOutlineArrowCircleRight } from "react-icons/md";


export default function ReviewForm({ onAddReview }) {
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        email: "",
        website: "",
        summary: "",
    });

    const [rating, setRating] = useState(3); // default rating 3

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = { ...formData, rating };
        console.log(newReview);

        onAddReview(newReview); // send review to parent

        alert("Review submitted successfully!");
        setFormData({
            title: "",
            name: "",
            email: "",
            website: "",
            summary: "",
        });
        setRating(3);
    };

    return (
        <div className="max-w-6xl bg- py-10 px-4 md:px-10 xl:px-35">
            <h2 className="text-4xl font-bold text-[#0f0f3a] mb-6">Write a Review</h2>

            <div className="flex items-center mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        type="button"
                        key={star}
                        onClick={() => handleRating(star)}
                        className="text-2xl text-orange-400 cursor-pointer"
                    >
                        {star <= rating ? <AiFillStar /> : <AiOutlineStar />}
                    </button>
                ))}
                <div className="text-lg font-semibold text-[#0f0f3a] ml-2">{rating}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="title"
                        placeholder="Review Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-400"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Reviewer Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Reviewer Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-400"
                    />
                    <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-400"
                    />
                </div>

                <textarea
                    name="summary"
                    placeholder="Review Summary"
                    rows="4"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:border-red-400"
                ></textarea>

                <button
                    type="submit"
                    className="relative overflow-hidden group cursor-pointer flex items-center gap-2 bg-[#f34e5c] hover:bg-[#5a4732] border-dark-color text-white px-2 py-4 font-semibold text-2xl shadow-md rounded-md transition-all duration-400"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Submit Review
                        <MdOutlineArrowCircleRight className="text-2xl transform translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                    </span>

                    {/* Background hover fill effect */}
                    <span className="absolute inset-0 hover:bg-[#5a4732] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
            </form>
        </div>
    );
}
