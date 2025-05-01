import { FaHeart, FaSearch, FaShoppingBag, FaStar } from 'react-icons/fa'
import { TiArrowLoop } from "react-icons/ti"
import sup4 from '../../../public/Home/sup4.jpg'
import beauty from '../../../public/Home/beauty.jpg'
import software from '../../../public/Home/software.jpg'
import jar from '../../../public/Home/jar.jpg'
import spray from '../../../public/Home/spray.jpg'
import ointment from '../../../public/Home/ointment.jpg'
import oil from '../../../public/Home/oil.jpg'
import wide from '../../../public/Home/wide.jpg'

export default function FeatureProduct() {
    const items = [
        { id: 1, category: 'Supplements', title: "Vitamin C 500mg", subtitle: 'Vitamins', price: '$16.00', icon: <FaStar />, bg: sup4 },
        { id: 2, category: 'Supplements', title: "Calcium + D3 Tablets", subtitle: 'Minerals', price: '$12.00', icon: <FaStar />, bg: beauty },
        { id: 3, category: 'Supplements', title: "Omega 3 Softgels", subtitle: 'Fish Oil', price: '$20.00', icon: <FaStar />, bg: software },
        { id: 4, category: 'Supplements', title: "Zinc Tablets", subtitle: 'Immune Support', price: '$10.00', icon: <FaStar />, bg: jar },
        { id: 5, category: 'Supplements', title: "Magnesium Capsules", subtitle: 'Muscle Health', price: '$15.00', icon: <FaStar />, bg: spray },
        { id: 6, category: 'Medicines', title: "Paracetamol", subtitle: 'Pain Relief', price: '$5.00', icon: <FaStar />, bg: ointment },
        { id: 7, category: 'Medicines', title: "Ibuprofen", subtitle: 'Anti-inflammatory', price: '$6.50', icon: <FaStar />, bg: oil },
        { id: 8, category: 'Medicines', title: "Cough Syrup", subtitle: 'Cold & Flu', price: '$7.00', icon: <FaStar />, bg: wide },
    ]

    return (
        <div className='mt-6 mb-6 px-4'>
            <h1 className='text-center font-bold text-3xl mb-8 text-[#009688]'>
                Featured Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white flex flex-col rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-transform transform hover:scale-[1.03] h-full"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <img src={item.bg} alt={item.title} className="object-cover w-full h-full" />
                            <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                <FaHeart className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
                                <TiArrowLoop className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
                                <FaSearch className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between flex-grow p-4">
                            <div>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    {[1, 2, 3].map(i => (
                                        <span key={i} className="text-[#009688]">{item.icon}</span>
                                    ))}
                                    <span className="text-[#009688] ml-2">{item.id}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-bold text-lg">{item.price}</p>
                                <div className="bg-[#009688] rounded-3xl text-white py-2 px-2 w-[55%] sm:w-[80%] md:w-full mx-auto flex justify-center items-center mt-2 cursor-pointer gap-2 hover:bg-[#00968782] hover:text-white transition">
                                    <FaShoppingBag />
                                    <button className="text-md">Select options</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
