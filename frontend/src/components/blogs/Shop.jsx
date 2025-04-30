import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";

const Shop = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='h-[50vh] bg-no-repeat bg-cover bg-center relative' style={{ backgroundImage: `url('/blogs/shop1.jpg')` }}>
                <div className='absolute top-8 left-8 flex flex-col items-start gap-4'>
                    <span className="bg-lt txt-gl px-3 py-1 rounded-full text-sm font-semibold shadow">
                        From $0.99
                    </span>
                    <h1 className='text-xl md:text-2xl font-semibold text-[#00B8A9]'>Breathable <br />
                        Face Mask
                    </h1>
                    <button className='group bg-[#00B8A9] text-white hover:bg-[#009688] px-3 py-1 rounded-full font-semibold shadow transition-all duration-500 hover:cursor-pointer flex items-center gap-2'>Shop Now                                     <MdOutlineNavigateNext size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
                </div>
            </div>
            <div className='h-[50vh] bg-no-repeat bg-cover bg-center relative' style={{ backgroundImage: `url('/blogs/shop2.jpg')` }}>
                <div className='absolute top-8 left-8 flex flex-col items-start gap-4'>
                    <span className="bg-lt txt-gl px-3 py-1 rounded-full text-sm font-semibold shadow">
                        From $9.99
                    </span>
                    <h1 className='text-xl md:text-2xl font-semibold text-[#00B8A9]'>Covid 19 pack <br />
                        Get it now 45% Off
                    </h1>
                    <button className='group bg-[#00B8A9] text-white hover:bg-[#009688] px-3 py-1 rounded-full font-semibold shadow transition-all duration-500 hover:cursor-pointer flex items-center gap-2'>Shop Now                                     <MdOutlineNavigateNext size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
                </div>
            </div>
        </div>
    )
}

export default Shop