import {  FaStar } from 'react-icons/fa'
import sup4 from '../../../public/Home/bottle1.jpg'
import beauty from '../../../public/Home/bottle2.jpg'
import software from '../../../public/Home/bottle3.jpg'
import jar from '../../../public/Home/bottle4.jpg'
import spray from '../../../public/Home/bottle5.jpg'
import ointment from '../../../public/Home/bottle6.jpg'
import oil from '../../../public/Home/bottle7.jpg'
import wide from '../../../public/Home/bottle9.jpg'
import bottle8 from '../../../public/Home/bottle8.jpg'

export default function MoreLove() {
    const items = [
        { id: 1, category: 'Supplements', title: "Vitamin C 500mg", subtitle: 'Vitamins', price: '$16.00', icon: <FaStar />, bg: sup4 },
        { id: 2, category: 'Supplements', title: "Calcium + D3 Tablets", subtitle: 'Minerals', price: '$12.00', icon: <FaStar />, bg: beauty },
        { id: 3, category: 'Supplements', title: "Omega 3 Softgels", subtitle: 'Fish Oil', price: '$20.00', icon: <FaStar />, bg: software },
        { id: 4, category: 'Supplements', title: "Zinc Tablets", subtitle: 'Immune Support', price: '$10.00', icon: <FaStar />, bg: jar },
        { id: 5, category: 'Supplements', title: "Magnesium Capsules", subtitle: 'Muscle Health', price: '$15.00', icon: <FaStar />, bg: spray },
        { id: 6, category: 'Medicines', title: "Paracetamol", subtitle: 'Pain Relief', price: '$5.00', icon: <FaStar />, bg: ointment },
        { id: 7, category: 'Medicines', title: "Ibuprofen", subtitle: 'Anti-inflammatory', price: '$6.50', icon: <FaStar />, bg: oil },
        { id: 8, category: 'Medicines', title: "Cough Syrup", subtitle: 'Cold & Flu', price: '$7.00', icon: <FaStar />, bg: wide },
        { id: 9, category: 'Medicines', title: "Cough Syrup", subtitle: 'Cold & Flu', price: '$7.00', icon: <FaStar />, bg: bottle8 },
    ]

    return (
        <div className='mt-6 mb-6 px-4'>
            <h1 className='text-center text-[#009688] font-bold text-3xl mb-8 '>
                More to love
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className=" cursor-pointer bg-white flex  rounded-lg shadow-md group hover:shadow-2xl transition-transform transform hover:scale-105 h-full"
                    >
                        {/* Image Section */}
                        <div className=" w-full sm:w-[30%] h-30">
                            <img src={item.bg} alt={item.title} className="object-contain w-full h-full" />      
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col justify-between w-full sm:w-[70%] ">
                            <div>
                            <div className="flex items-center gap-1 mt-2">
                                    {[1, 2, 3].map(i => (
                                        <span key={i} className="text-yellow-500">{item.icon}</span>
                                    ))}
                                    <span className="text-[#a8754d] ml-2">{item.id}</span>
                                </div>
                                <h2 className="font-bold transition ease-in delay-100 text-lg group-hover:text-[#009688]">{item.title}</h2>
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
