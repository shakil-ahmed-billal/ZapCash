import Header from '@/components/header/Header';
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useUser from '@/hooks/useUser';
import { cn } from "@/lib/utils";
import { Cable } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { WalletCards } from 'lucide-react';
import { ArrowRightLeft, CreditCard, Home, LineChart, LogIn, LogOut, Menu, Settings, Users } from 'lucide-react';
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom';

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


    const { data: info, isLoading, isPending } = useUser()

    if (isLoading || isPending) return <Loading />

    console.log(info);
    return (
        <div className={cn(
            "fixed inset-y-0 left-0 w-[240px]  bg-background border-r shadow-md  transition-transform md:relative md:translate-x-0 ",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Close Button for Mobile */}
            <Sheet open={isOpen} onOpenChange={toggleSidebar}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                    <div className="flex flex-col space-y-4">
                        <Link to="/home" className="font-bold text-lg">Home</Link>
                        <Link to="/dashboard" className="font-bold text-lg">Dashboard</Link>
                        <Link to="/contact" className="font-bold text-lg">Contact</Link>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex flex-col gap-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
                    <div className="space-y-1">
                        {info?.data?.acType == "user" ? <>
                            <Link to="/home"><SidebarItem icon={<Home className="h-4 w-4" />} title="Home" /></Link>
                            <Link to="/dashboard"><SidebarItem icon={<LineChart className="h-4 w-4" />} title="Dashboard" /></Link>
                            <Link to="/dashboard/user-trx"><SidebarItem icon={<ArrowRightLeft className="h-4 w-4" />} title="Transactions" /></Link>
                        </> : info?.data?.acType == "agent" ? <>
                            <Link to="/home"><SidebarItem icon={<Home className="h-4 w-4" />} title="Home" /></Link>
                            <Link to="/dashboard"><SidebarItem icon={<LineChart className="h-4 w-4" />} title="Dashboard" /></Link>
                            <Link to="/dashboard/user-trx"><SidebarItem icon={<ArrowRightLeft className="h-4 w-4" />} title="Transactions" /></Link>
                        </> : <>
                            <Link to="/dashboard"><SidebarItem icon={<Home className="h-4 w-4" />} title="Dashboard" /></Link>
                            <Link to="/dashboard/user-manage"><SidebarItem icon={<Users className="h-4 w-4" />} title="Manage Users" /></Link>
                            <Link to="/dashboard/agent-manage"><SidebarItem icon={<ShieldCheck  className="h-4 w-4" />} title="Agent Approval" /></Link>
                            <Link to="/dashboard/transactions"><SidebarItem icon={<Cable  className="h-4 w-4" />} title="All Trx History" /></Link>
                            <Link to="/dashboard/cashRequest"><SidebarItem icon={<HandCoins className="h-4 w-4" />} title="Cash Request" /></Link>
                            <Link to="/dashboard/withdraw"><SidebarItem icon={<WalletCards  className="h-4 w-4" />} title="withdraw Cash" /></Link>
                        </>}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
                    <div className="space-y-1">
                        <Link to="/home"><SidebarItem icon={<Settings className="h-4 w-4" />} title="General" /></Link>
                        <Link to="/home"><SidebarItem icon={<CreditCard className="h-4 w-4" />} title="Billing" /></Link>
                        <Link to="/home"><SidebarItem icon={<LogIn className="h-4 w-4" />} title="Login" /></Link>
                        <Link to="/home"><SidebarItem icon={<LogOut className="h-4 w-4" />} title="Logout" /></Link>
                    </div>
                </div>
            </div>
        </div >
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
                    className="absolute  left-4 md:hidden p-2 top-14 "
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
