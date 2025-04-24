import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const salesData = [
    { month: "Jan", sales: 4200 },
    { month: "Feb", sales: 5200 },
    { month: "Mar", sales: 4800 },
    { month: "Apr", sales: 6100 },
    { month: "May", sales: 6900 },
    { month: "Jun", sales: 7500 },
];

const SalesGrowthChart = () => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-md p-6 mt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="text-lg font-semibold mb-4 text-dark-color">Sales Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#1e40af"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default SalesGrowthChart;
