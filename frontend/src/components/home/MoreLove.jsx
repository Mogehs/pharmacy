import { FaStar } from "react-icons/fa";
import { useGetProductsQuery } from "../features/productsApi";

export default function MoreLove() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-4 text-red-500">Error loading products.</p>
    );
  }

  return (
    <div className="mt-6 mb-6 px-4">
      <h1 className="text-center text-[#009688] font-bold text-3xl mb-8">
        More to love
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, 9).map((item, index) => (
          <div
            key={index}
            className="cursor-pointer bg-white flex rounded-lg shadow-md group hover:shadow-2xl transition-transform transform hover:scale-105 h-full"
          >
            {/* Image Section */}
            <div className="w-full sm:w-[30%] h-30">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between w-full sm:w-[70%] p-3">
              <div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      <FaStar />
                    </span>
                  ))}
                  <span className="text-[#a8754d] ml-2 text-sm">
                    {item.category}
                  </span>
                </div>
                <h2 className="font-bold transition ease-in delay-100 text-lg group-hover:text-[#009688]">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="font-semibold text-md text-[#009688] mt-2">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
