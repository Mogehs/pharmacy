import React from 'react';
import DashboardStats from "../../components/Dashboard/DashboardStats";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import CategoryPieChart from '../../components/Dashboard/CategoryPieChart';

const Dashboard = () => {
    return (
        <div className="md:pt-2 space-y-6">
            <DashboardStats />
            <DashboardChart />
            <CategoryPieChart />
        </div>
    );
};

export default Dashboard;
