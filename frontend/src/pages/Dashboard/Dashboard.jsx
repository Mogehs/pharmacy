import React from 'react';
import DashboardStats from "../../components/Dashboard/DashboardStats";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import Topbar from '../../components/Dashboard/Topbar';
import Sidebar from '../../components/Dashboard/Sidebar';
import CategoryPieChart from '../../components/Dashboard/CategoryPieChart';
import TopSellingProducts from '../../components/Dashboard/TopSellingProducts';
import LowStockAlerts from '../../components/Dashboard/LowStockAlerts';
import AdminNotifications from '../../components/Dashboard/AdminNotifications';
import UserSummaryCard from '../../components/Dashboard/UserSummaryCard';
import SalesGrowthChart from '../../components/Dashboard/SalesGrowthChart';
import Products from '../../components/Dashboard/Products';
import Customers from '../../components/Dashboard/Customers';

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
