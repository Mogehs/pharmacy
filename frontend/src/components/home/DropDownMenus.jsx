import React, { useState } from 'react';

export default function DropDownMenus() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selected1, setSelected1] = useState("Dropdown 1");
    const [selected2, setSelected2] = useState("Dropdown 2");

    return (
        <div className="w-full sm:w-11/12 md:w-9/12 bg-white shadow-lg shadow-blue-100 mx-auto flex flex-col gap-4 items-center justify-center p-6 rounded-md">

            <p className="font-semibold text-xl sm:text-3xl text-[#009688]">Select Product</p>

            <div className="flex flex-wrap gap-4 justify-center items-center w-full">

                {/* Dropdown 1 */}
                <div className="relative w-full sm:w-auto">
                    <button
                        onClick={() => {
                            setOpen1(!open1);
                            setOpen2(false);
                        }}
                        className="w-full sm:w-auto text-white bg-[#009688] focus:ring-2 focus:outline-none focus:ring-[#009688] font-medium rounded-3xl text-sm px-5 py-2.5 flex justify-between items-center"
                    >
                        {selected1}
                        <svg className="w-3 h-3 ml-2" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>

                    {open1 && (
                        <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700">
                                {["Dashboard", "Settings", "Earnings", "Sign out"].map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => {
                                                setSelected1(item);
                                                setOpen1(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Dropdown 2 */}
                <div className="relative w-full sm:w-auto">
                    <button
                        onClick={() => {
                            setOpen2(!open2);
                            setOpen1(false);
                        }}
                        className="w-full sm:w-auto text-white bg-[#009688] focus:ring-2 focus:outline-none focus:ring-[#009688] font-medium rounded-3xl text-sm px-5 py-2.5 flex justify-between items-center"
                    >
                        {selected2}
                        <svg className="w-3 h-3 ml-2" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>

                    {open2 && (
                        <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700">
                                {["Option A", "Option B", "Option C", "Logout"].map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => {
                                                setSelected2(item);
                                                setOpen2(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* OR Text */}
                <span className="font-semibold text-sm">OR</span>

                {/* Input and Button */}
                <input
                    type="text"
                    placeholder="Enter SKU"
                    className="w-full sm:w-auto text-white bg-[#009688] focus:ring-2 focus:outline-none focus:ring-[#009688] font-medium rounded-3xl text-sm px-5 py-2.5 flex justify-between items-center"
                />
                <button className="w-full sm:w-auto rounded-3xl p-2 bg-transparent text-black hover:bg-[#009688] hover:text-white transition-all ease-in delay-100 cursor-pointer border border-[#009688] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5">
                    Show now
                </button>
            </div>
        </div>
    );
}
