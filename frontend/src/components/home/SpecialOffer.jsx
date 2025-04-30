import React from 'react'
import bgimg from '../../../public/Home/bgimg.jpg'
import bgimg2 from '../../../public/Home/bgimg2.jpg'
export default function SpecialOffer() {
  return (
    <div className=''>
        <h1 className='text-center font-bold text-3xl mb-8 txt-gd'>Special offers</h1>

        <div className=' flex w-full flex-wrap'>
            <div className=' w-full h-[20vh] sm:w-[50%] rounded-md' style={{background:`url{${bgimg}}`,backgroundSize:'cover'}}>
                <span className=' bg-[#f2971f] py-2  text-white  rounded-3xl'>From $0.99</span>
            </div>
        </div>
    </div>
  )
}
