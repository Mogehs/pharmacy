import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../features/productsApi";

const COLORS = [
  "#ffc107",
  "#ff6b6b",
  "#36a2eb",
  "#4caf50",
  "#9c27b0",
  "#ff9800",
  "#607d8b",
];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#222"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CategoryPieChart = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  // Group products by category
  const categoryData = useMemo(() => {
    const counts = {};
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-dark-color mb-6 tracking-wide">
        📊 Product Distribution by Category
      </h3>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load data</p>
      ) : (
        <div className="w-full h-[500px] md:h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={130}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [`${value} items`, name]}
              />
              <Legend
                iconType="circle"
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryPieChart;
