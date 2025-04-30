import React from 'react'
import bg2 from '../../../public/Home/bg2.jpg'
import medicine from '../../../public/Home/medicine5.png'
import { FaArrowRight } from 'react-icons/fa'
export default function NewestProduct() {
    return (
        <div className='relative mt-4 mb-3 rounded-md w-full p-6 sm:w-10/12 mx-auto' style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className=' relative'>

                <div className='w-full sm:w-[70%] mx-auto '>
                    <p className='w-[40%] sm:w-[40%] text-center text-xs bg-orange-400 p-2 text-white rounded-3xl'>
                        Get it now 45% OFF
                    </p>

                    <h1 className='text-md font-bold sm:text-xl'>
                        Save unto 10% extra enjoy FREE delivery with PLUS membership
                    </h1>
                    <button className='h-[30px] w-[40%] sm:w-[40%] p-3 mt-2 flex items-center justify-center gap-2  cursor-pointer  rounded-3xl bg-orange-400 text-white'>
                        <span className=' '>Show Now </span>
                        <span><FaArrowRight /></span>
                    </button>
                </div>
            </div>
            <div className='absolute right-0 mx-3 bottom-0 h-[20vh] w-[20%] sm:h-[40vh] sm:w-[28%] md:left-0 md:bottom-0 ' style={{ background: `url(${medicine})`, backgroundSize: 'cover' }}>

            </div>
        </div>
    )
}
