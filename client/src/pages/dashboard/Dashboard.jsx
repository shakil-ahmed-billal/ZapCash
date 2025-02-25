import Header from '@/components/header/Header';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
    CreditCard, Home, LineChart, Package, Settings,
    ShoppingCart, Users, Menu, X
} from 'lucide-react';

// Sidebar Item Component
function SidebarItem({ icon, title, isActive }) {
    return (
        <button
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent w-full",
                isActive && "bg-accent"
            )}
        >
            {icon}
            <span>{title}</span>
        </button>
    );
}

// Sidebar Component
function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={cn(
            "fixed inset-y-0 left-0 w-[240px] bg-background border-r shadow-md  transition-transform md:relative md:translate-x-0 ",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Close Button for Mobile */}
            <div className="z-50 flex justify-end p-2 md:hidden">
                <button onClick={toggleSidebar} className="p-2">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="flex flex-col gap-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
                    <div className="space-y-1">
                        <SidebarItem icon={<Home className="h-4 w-4" />} title="Dashboard" isActive />
                        <SidebarItem icon={<ShoppingCart className="h-4 w-4" />} title="Orders" />
                        <SidebarItem icon={<Users className="h-4 w-4" />} title="Customers" />
                        <SidebarItem icon={<Package className="h-4 w-4" />} title="Products" />
                        <SidebarItem icon={<LineChart className="h-4 w-4" />} title="Analytics" />
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
                    <div className="space-y-1">
                        <SidebarItem icon={<Settings className="h-4 w-4" />} title="General" />
                        <SidebarItem icon={<CreditCard className="h-4 w-4" />} title="Billing" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Dashboard Component
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header with Mobile Menu Button */}
            <div className="relative">
                <Header />
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 left-4 md:hidden p-2 bg-gray-200 rounded-full"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            <div className="flex">
                {/* Sidebar - Responsive */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Background Overlay when Sidebar is Open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default Dashboard;
