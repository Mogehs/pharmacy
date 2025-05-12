import React from "react";

const Instructors = ({ course }) => {
  return (
    <div>
      {/* Instructors */}
      <div className="bg-gray-50 py-10 px-4 md:px-10 xl:px-30 ">
        <h2 className="text-3xl font-semibold text-[#009688] mb-6">
          Instructors
        </h2>
        <div className="bg-gray-200 max-w-2xl rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <img
            src="/default.jpg"
            alt="Courselog"
            className="w-32 h-32 sm:w-45 sm:h-45 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-[#00B8A9] mb-4">
              {course.instructor}
            </h3>
            {/* <div className="flex sm:flex-row items-center gap-2 sm:divide-x divide-[#00B8A9] text-[#295088]">
              <div className="px-4">
                <div className="text-2xl font-semibold text-[#0f172a]">1</div>
                <div>Courses</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-semibold text-[#0f172a]">0</div>
                <div>Reviews</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-semibold text-[#0f172a]">0</div>
                <div>Rating</div>
              </div>
            </div> */}
          </div>
        </div>

        {/*     <h1 className='text-3xl text-[#00B8A9] font-medium mt-12'>Tags :</h1> */}
        {/* <div className='flex gap-2 mt-5 px-18'>
                    <button className="py-1 px-3 border border-gray-300  font-semibold hover:bg-[#009688] hover:text-white cursor-pointer hover:border-[#009688] rounded-full transition-all duration-400 ease-in-out">
                        Java
                    </button>
                    <button className="py-1 px-3 border border-gray-300  font-semibold hover:bg-[#009688] hover:text-white cursor-pointer hover:border-[#009688] rounded-full transition-all duration-400 ease-in-out">
                        Python
                    </button>

                </div> */}
      </div>
    </div>
  );
};

export default Instructors;
