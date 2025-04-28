import React, { useState } from 'react';

const Review = () => {
    const [Description, setDescription] = useState(false);
    const [additionInfo, setAdditionInfo] = useState(false);
    const [review, setReview] = useState(false);

    const showDesc = () => {
        setDescription(!Description);
        setAdditionInfo(false);
        setReview(false);
    };
    const showAdditionInfo = () => {
        setAdditionInfo(!additionInfo);
        setDescription(false);
        setReview(false);
    };
    const showReview = () => {
        setReview(!review);
        setDescription(false);
        setAdditionInfo(false);
    };

    return (
        <div>
            {/* Options */}
            <div className="w-full  mt-2">
                <div className="flex flex-col gap-3 py-3 px-2">
                    <div>
                        <span
                            className="px-3 py-2 hover:bg-gray-100 font-bold rounded-sm cursor-pointer transition-all hover:text-blue-400"
                            onClick={showDesc}
                        >
                            Description
                        </span>
                        <span
                            className="px-3 py-2 hover:bg-gray-100 font-bold rounded-sm cursor-pointer transition-all hover:text-blue-400"
                            onClick={showAdditionInfo}
                        >
                            Additional Information
                        </span>
                        <span
                            className="px-3 py-2 hover:bg-gray-100 font-bold rounded-sm cursor-pointer transition-all hover:text-blue-400"
                            onClick={showReview}
                        >
                            Reviews (1)
                        </span>
                    </div>
                    <div className="w-full h-auto p-4 shadow-sm">
                        {Description && <p>{/* Your description content */}

                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire


                        </p>}

                        {additionInfo && (
                            <div className="w-full flex">
                                <div className="w-[30%] border border-gray-200 py-5 px-2 bg-gray-100">
                                    <ul className="flex flex-col ">
                                        <li className="border-b border-gray-300">Brand</li>
                                        <li className="border-b border-gray-300">Form</li>
                                        <li className="border-b border-gray-300">Milliliters</li>
                                    </ul>
                                </div>
                                <div className="w-[70%] border border-gray-200 py-5 px-2">
                                    <ul className="flex flex-col">
                                        <li className="border-b border-gray-300">Motu</li>
                                        <li className="border-b border-gray-300">Mask</li>
                                        <li className="border-b border-gray-300">25</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {review && (
                            <div className="w-full flex flex-col">
                                <div className="w-full">
                                    <h1 className="text-xl font-semibold">Add a review</h1>
                                    <p className="text-sm">
                                        Your email address will not be published. Required fields are marked *
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-2 mt-10 mb-3">
                                    <label>Your review</label>
                                    <textarea className="bg-blue-100 rounded-sm h-30 focus:outline-blue-400 focus:bg-white cursor-pointer transition-all" />
                                </div>
                                <div className="w-full flex gap-3">
                                    <div className="w-1/2 flex flex-col">
                                        <label>Name</label>
                                        <input type="text" className="py-2 px-2 bg-blue-100 focus:outline-blue-400 focus:bg-white rounded-sm" />
                                    </div>
                                    <div className="w-1/2 flex flex-col">
                                        <label>Email</label>
                                        <input type="email" className="py-2 px-2 bg-blue-100 focus:outline-blue-400 focus:bg-white rounded-sm" />
                                    </div>
                                </div>
                                <div className="w-full flex gap-2 mt-5 mb-2">
                                    <input type="checkbox" />
                                    <p>Save my name, email, and website for next time.</p>
                                </div>
                                <button className="px-10 py-2 bg-[#F2971F] hover:bg-amber-200 rounded-sm text-white font-semibold text-lg">
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;