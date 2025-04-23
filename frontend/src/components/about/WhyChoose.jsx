import React from 'react';


const Whychoose = () => {

    return (
        <section className="flex flex-col md:flex-row items-start gap-10 p-4 md:p-12 md:mt-8">
            {/* Left Side */}
            <div className="flex-1 mt-8">
                <h2 className="text-xl txt-gl font-bold inline-block cursor-pointer">
                    Why choose us?
                </h2>
                <p className="text-gray-500  mt-3 md:mt-6">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human.</p>
                <p className="text-gray-500  md:mt-3">
                    No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences.
                </p>

                <div className="flex-1 mt-8">
                    <h2 className="text-xl txt-gl font-bold inline-block cursor-pointer">
                        Technology we use
                    </h2>
                    <p className="text-gray-500 md:mt-2">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because.</p>
                </div>
            </div>


            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center">
                <img
                    src="./about/post6.jpg"
                    alt="Image"
                    className="mb-4 rounded-2xl shadow hover:scale-103 transition-transform duration-300"
                />

            </div>
        </section>
    );
};

export default Whychoose;

