import { FaHeart, FaSearch, FaShoppingBag, FaStar } from "react-icons/fa";
import { TiArrowLoop } from "react-icons/ti";
import { useGetProductsQuery } from "../features/productsApi";

export default function FeatureProduct() {
  const { data: items = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-4 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="mt-6 mb-6 px-4">
      <h1 className="text-center font-bold text-3xl mb-8 text-[#009688]">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="relative bg-white flex flex-col rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-transform transform hover:scale-[1.03] h-full"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <FaHeart className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
                <TiArrowLoop className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
                <FaSearch className="text-[#009688] text-xl hover:scale-110 cursor-pointer" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow p-4">
              <div>
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <FaStar key={i} className="text-[#009688] text-sm" />
                  ))}
                  <span className="text-[#009688] ml-2 text-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                <div className="bg-[#009688] rounded-3xl text-white py-2 px-2 w-[55%] sm:w-[80%] md:w-full mx-auto flex justify-center items-center mt-2 cursor-pointer gap-2 hover:bg-[#00968782] transition">
                  <FaShoppingBag />
                  <button className="text-md">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
