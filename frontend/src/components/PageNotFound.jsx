import { Link } from 'react-router-dom';
import { MdOutlineArrowCircleRight } from "react-icons/md";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#525052] text-white p-4 border-b">
            <h2 className="text-3xl font-semibold">Ooops..</h2>
            <p className="text-2xl font-semibold mt-2">
                This <span className="txt-gl">Page Is Not On Our Route</span>
            </p>
            <h1 className="text-7xl font-bold txt-gl mt-4">404</h1>

            {/* Horizontal line */}
            <hr className="w-1/2 border-gl my-6" />

            {/* Link button back to home */}
            <Link
                to="/"
            >
                <button
                    className="relative overflow-hidden group cursor-pointer flex items-center gap-2  bg-[#a8754d] border border-[#a8754d] text-white px-6 py-3 font-semibold text-lg shadow-md rounded-md transition-all duration-500"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Back To Home Page
                        <MdOutlineArrowCircleRight className="text-2xl transform translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                    </span>

                    {/* Background hover fill effect */}
                    <span className="absolute inset-0 bg-[#525052] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
            </Link>
        </div>
    );
}
