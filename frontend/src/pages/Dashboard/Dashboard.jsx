import React from "react";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import CategoryPieChart from "../../components/Dashboard/CategoryPieChart";
import UserSummaryCard from "../../components/Dashboard/UserSummaryCard";

const Dashboard = () => {
  return (
    <div className="md:pt-2 space-y-6">
      <DashboardStats />
      <DashboardChart />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 ">
        <CategoryPieChart />
        <UserSummaryCard className="grid grid-cols-1 gap-10" />
      </div>
    </div>
  );
};

export default Dashboard;
