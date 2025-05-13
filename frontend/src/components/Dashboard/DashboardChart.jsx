import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useGetAllOrdersQuery } from "../features/ordersApi";
import { format } from "date-fns";

const DashboardChart = () => {
  const { data: orders } = useGetAllOrdersQuery();

  // Generate dynamic chart data
  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const monthlyTotals = {};

    orders.forEach((order) => {
      if (order.isPaid) {
        const month = format(new Date(order.createdAt), "MMM"); // e.g., "Apr"
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += order.totalPrice;
      }
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthOrder.map((m) => ({
      name: m,
      sales: monthlyTotals[m] || 0,
    }));
  }, [orders]);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-dark-color mb-6 tracking-wide">
        📈 Monthly Sales Overview
      </h3>

      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#8884d8" fontSize={12} />
            <YAxis stroke="#8884d8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#555" }}
              formatter={(value) => [`$${value}`, "Sales"]}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ffc107"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardChart;
