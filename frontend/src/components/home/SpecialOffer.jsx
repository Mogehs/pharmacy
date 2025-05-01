import React from 'react'
import bgimg from '../../../public/Home/bgimg.jpg'
import bgimg2 from '../../../public/Home/bgimg2.jpg'
export default function SpecialOffer() {
  return (
    <div className=' mb-4'>
        <h1 className='text-center text-[#009688] font-bold text-3xl mb-8'>Special offers</h1>
        <div className=' w-full mx-auto sm:w-11/12  flex  gap-2 flex-wrap'>
            <div className=' p-3 flex flex-col justify-center items-start px-4 w-full h-[50vh]  sm:w-[45%] mx-auto rounded-md' style={{ backgroundImage: `url(${bgimg})`, backgroundSize: '100% 100%' }}>
                <span className=' bg-[#009688] px-4 mb-2 py-2  text-white  rounded-3xl'>From $0.99</span>
                <h1 className=' text-xl font-bold mt-2 sm:text-3xl mb-1'>Breathable</h1>
                <span className=' text-xl font-serif mb-1'>Face Mask</span>
                <button className=' bg-[#009688] px-4 mb-2 py-2  text-white  rounded-3xl'>Shop Now</button>
            </div>
            <div className=' p-3  flex flex-col justify-center items-start px-4 w-full h-[50vh]  sm:w-[45%] rounded-md' style={{ backgroundImage: `url(${bgimg2})`, backgroundSize: '100% 100%' }}>
                <span className=' bg-[#009688] px-4 mb-2 py-2  text-white  rounded-3xl'>From $9.99</span>
                <h1 className=' text-xl font-bold mt-2 sm:text-3xl mb-1'>Covid 19 pack</h1>
                <span className=' text-xl font-serif mb-1'>Get it now 45% Off                </span>
                <button className=' bg-[#009688] px-4 mb-2 py-2  text-white  rounded-3xl'>Shop Now</button>
            </div>
        </div>
    </div>
  )
}
