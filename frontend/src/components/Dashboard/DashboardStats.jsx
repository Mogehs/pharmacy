import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MdAttachMoney, MdInventory, MdShoppingCart } from "react-icons/md";
import { useGetAllOrdersQuery } from "../features/ordersApi";
import { useGetProductsQuery } from "../features/productsApi";

const DashboardStats = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const stats = useMemo(() => {
    if (!orders || isLoading || !products || productsLoading) return [];

    const totalOrders = orders.length;

    const totalSales = orders
      .filter((order) => order.isPaid)
      .reduce((acc, order) => acc + order.totalPrice, 0);

    const totalStock = products.reduce(
      (all, products) => all + products.stock,
      0
    );

    return [
      {
        title: "Total Sales",
        value: `$${totalSales.toLocaleString()}`,
        icon: <MdAttachMoney className="text-3xl text-green-500" />,
        color: "bg-green-100",
      },
      {
        title: "Total Orders",
        value: totalOrders.toLocaleString(),
        icon: <MdShoppingCart className="text-3xl text-blue-500" />,
        color: "bg-blue-100",
      },
      // You can re-enable the following if you want to track inventory:
      {
        title: "In Stock",
        value: totalStock,
        icon: <MdInventory className="text-3xl text-purple-500" />,
        color: "bg-purple-100",
      },
      // {
      //   title: "Low Stock",
      //   value: "12 Alerts",
      //   icon: <MdWarning className="text-3xl text-red-500" />,
      //   color: "bg-red-100",
      // },
    ];
  }, [orders, isLoading, products, productsLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`p-5 rounded-lg shadow-md flex items-center gap-4 ${stat.color}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="p-3 rounded-full bg-white shadow-md">{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <h3 className="text-xl font-bold text-dark-color">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
