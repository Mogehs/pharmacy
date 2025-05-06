import React, { useMemo } from "react";
import { FaUserFriends, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useGetAllUsersQuery } from "../features/userApi";

const UserSummaryCard = ({ className }) => {
  const { data: users, isLoading } = useGetAllUsersQuery();

  const userStats = useMemo(() => {
    if (!users || isLoading) return [];

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalCustomers = users.length;
    let activeUsers = 0;
    let newUsers = 0;

    users.forEach((user) => {
      if (user.orders && user.orders.length > 0) {
        activeUsers++;
      }

      const createdAt = new Date(user.createdAt);
      if (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      ) {
        newUsers++;
      }
    });

    return [
      {
        icon: <FaUserFriends className="text-2xl text-blue-500" />,
        label: "Total Customers",
        value: totalCustomers.toLocaleString(),
      },
      {
        icon: <FaUserCheck className="text-2xl text-green-500" />,
        label: "Active Users",
        value: activeUsers.toLocaleString(),
      },
      {
        icon: <FaUserPlus className="text-2xl text-purple-500" />,
        label: "New Signups",
        value: newUsers.toLocaleString(),
      },
    ];
  }, [users, isLoading]);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-dark-color">
        👥 User Overview
      </h3>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className={className}>
          {userStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 border rounded-md p-3 hover:shadow-lg transition h-25"
            >
              <div>{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-dark-color">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UserSummaryCard;
