import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 500 },
    { name: 'Apr', sales: 700 },
    { name: 'May', sales: 600 },
];

const DashboardChart = () => {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-bold text-[#00B8A9] mb-6 tracking-wide">
                📈 Monthly Sales Overview
            </h3>

            <div className="w-full h-[300px] md:h-[400px]">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                        <XAxis dataKey="name" stroke="#8884d8" fontSize={12} />
                        <YAxis stroke="#8884d8" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '10px' }}
                            labelStyle={{ fontWeight: 'bold', color: '#555' }}
                            formatter={(value) => [`$${value}`, 'Sales']}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#ffc107"
                            strokeWidth={3}
                            dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DashboardChart;
