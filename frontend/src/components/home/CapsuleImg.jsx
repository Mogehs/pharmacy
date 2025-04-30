import React from 'react'
import bg1 from '../../../public/Home/bg1.jpg'
import bg2 from '../../../public/Home/bg2.jpg'
import bg3 from '../../../public/Home/bg3.jpg'
import bg4 from '../../../public/Home/bg4.jpg'
import bg5 from '../../../public/Home/bg5.jpg'
import medicine1 from '../../../public/Home/medicine1.png'
import medicine2 from '../../../public/Home/medicine2.png'
import medicine3 from '../../../public/Home/medicine3.png'
import medicine4 from '../../../public/Home/medicine4.png'
import medicine5 from '../../../public/Home/medicine5.png'

const items = [
  {
    bg: bg1,
    medicine: medicine1,
    title: 'Pyridoxine Vitamin B6',
    color: '#d09f5f',
  },
  {
    bg: bg2,
    medicine: medicine2,
    title: 'Ascorbic Acid Vitamin C',
    color: '#ffa238',
  },
  {
    bg: bg4,
    medicine: medicine4,
    title: 'Iron Supplement Tablets',
    color: '#9c27b0',
  },
  {
    bg: bg5,
    medicine: medicine5,
    title: 'Calcium Carbonate 600mg',
    color: '#00bcd4',
  },
]

export default function CapsuleImg() {
  return (
    <div className='w-full mx-auto sm:w-11/12 py-4 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between'>
      <div className="grid w-full sm:w-[100%] sm:grid-cols-2 grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="col-span-1 w-full flex justify-center sm:justify-start items-center rounded-md"
            style={{
              backgroundImage: `url(${item.bg})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              height: '300px',
            }}
          >
            <div
              className="md:w-[50%]  mx-5 flex justify-center items-center"
              style={{
                backgroundImage: `url(${item.medicine})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                height: '80%',
              }}
            >
              <div className='w-full sm:w-[50%]   sm:hidden block'>
                <p className='text-black text-xl sm:tex2xl'>Get it now 45% OFF</p>
                <h1 className='text-xl font-bold sm:text-2xl'>{item.title}</h1>
                <button
                  className='px-4 mt-2 cursor-pointer py-2 rounded-3xl'
                  style={{ backgroundColor: item.color }}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className='w-full sm:w-[50%] sm:block hidden'>
              <p className='text-gray-500'>Get it now 45% OFF</p>
              <h1 className='text-xl font-bold sm:text-xl'>{item.title}</h1>
              <button
                className='px-4 mt-2 cursor-pointer py-2 rounded-3xl'
                style={{ backgroundColor: item.color }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className='w-full sm:w-[38%] sm:hidden lg:flex justify-center items-center'
        style={{
          background: `url(${bg3})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          height: '300px',
        }}
      >
        <div
          className="w-[50%] mx-auto mt-4 flex justify-center items-end"
          style={{
            backgroundImage: `url(${medicine3})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            height: '90%',
          }}
        >
          <div className='w-full h-full text-center sm:w-[50%] sm:hidden block '>
            <p className='w-[100%] mx-auto text-center text-ms sm:w-[80%] bg-orange-400 p-3 text-white rounded-3xl'>
              Get it now 45% OFF
            </p>
            <span>Pyridoxine Vitamin B6</span>
            <h1 className='text-xl font-bold sm:text-xl'>
              Pyridoxine Vitamin B6
            </h1>
            <button className='px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#ffa238] text-white'>
              Buy Now
            </button>
          </div>
        </div>



        <div className='w-full sm:w-[50%] sm:block hidden'>
          <p className='w-full sm:w-[80%] text-xs bg-orange-400 p-2 text-white rounded-3xl'>
            Get it now 45% OFF
          </p>
          <span>Pyridoxine Vitamin B6</span>
          <h1 className='text-xl font-bold sm:text-xl'>
            Pyridoxine Vitamin B6
          </h1>
          <button className='px-4 mt-2 cursor-pointer py-2 rounded-3xl bg-[#ffa238] text-white'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
