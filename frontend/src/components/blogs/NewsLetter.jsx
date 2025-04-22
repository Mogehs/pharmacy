import React from 'react';

const NewsLetter = () => {
    return (
        <div
            className="md:h-[80vh] bg-no-repeat bg-cover bg-center flex items-center justify-center text-center px-4"
            style={{
                backgroundImage: `url('/blogs/bg.jpg')`, // Replace with your actual path
            }}
        >
            <div className="p-8 rounded-2xl max-w-xl w-full">
                <h2 className="text-3xl md:text-4xl font-bold txt-gl mb-4">Join our newsletter</h2>
                <p className="text-sm md:text-base color2 mb-6">Join over half a million vitamin lovers and get our latest deals, articles, and resources!</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter address"
                        className="flex-1 px-4 py-2 rounded-lg focus:outline-none bg-white text-black"
                    />
                    <button className="bg-dk txt-gl px-6 py-2 rounded-lg hover:brightness-110 transition-all duration-300">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
