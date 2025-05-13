import { useGetMyOrdersQuery } from "../features/ordersApi";

const statusColors = {
  PreparingPackage: "bg-blue-100 text-blue-800",
  ReadyToShip: "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
};

export default function UserOrders() {
  const { data: orders = [], isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="text-center py-16 text-lg font-semibold text-gray-600 animate-pulse">
        Loading your pharmacy orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-lg font-semibold text-red-600">
        Unable to load your orders. Please try again later.
      </div>
    );
  }

  const hasOrders =
    orders.length > 0 && orders.some((order) => order.items.length > 0);

  if (!hasOrders) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h18v4H3V3zm0 6h18v12H3V9zm3 3h3m4 0h4"
          />
        </svg>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h3>
        <p className="text-gray-500 max-w-sm">
          Your prescriptions and health products will appear here once ordered.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-fit">
      <h2 className="text-3xl font-bold mb-6 text-[#00B8A9] text-center">
        Your Pharmacy Orders
      </h2>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="bg-[#00B8A9] text-white text-center">
              <th className="p-3">Image</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.items.map((item, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className="border-t border-gray-200 text-center hover:bg-green-50 transition"
                >
                  <td className="p-3 flex justify-center">
                    <img
                      src={item.product?.image || "/placeholder.jpg"}
                      alt={item.product?.name || "Medicine"}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-700">
                    {item.product?.name || "Unknown"}
                  </td>
                  <td className="p-3 text-gray-600">{item.quantity}</td>
                  <td className="p-3 text-gray-600">
                    ${order.totalPrice.toFixed(2) || "N/A"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Preparing Package"
                          ? statusColors["PreparingPackage"]
                          : order.status === "Ready To Ship"
                          ? statusColors["ReadyToShip"]
                          : statusColors["Delivered"]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
