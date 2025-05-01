import React from 'react'
import { IoWalletOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsHouseDoor } from "react-icons/bs";
export default function SuretyBox() {
    const array=[
        {
            icon:<IoWalletOutline />,title:'100% Money back'
        },
        {
            icon:<BsHouseDoor />,title:'Non-contact shipping'
        },
        {
            icon:<LiaShippingFastSolid />,title:'Free delivery over $200'
        },
    ]
  return (
    <div>
        <div className=' w-full sm:w-11/12 mx-auto mb-4'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10'>
                {array.map((item,index)=>(
                    <div key={index} className='flex cursor-pointer group items-center justify-center  rounded-lg p-4'>
                        <div className='text-2xl text-gray-400 group-hover:text-[#009688] transition-all ease-in delay-100 mr-2'>
                            {item.icon}
                        </div>
                        <h1 className='text-lg font-semibold group-hover:text-[#009688] transition-all ease-in delay-100'>{item.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
