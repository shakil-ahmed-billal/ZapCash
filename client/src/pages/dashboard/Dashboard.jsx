import Header from '@/components/header/Header';
import { useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    CreditCard,
    DollarSign,
    Home,
    LineChart,
    Package,
    Settings,
    ShoppingCart,
    Users
} from 'lucide-react';
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 35000 },
    { month: 'Apr', revenue: 42000 },
    { month: 'May', revenue: 48000 },
    { month: 'Jun', revenue: 45000 },
    { month: 'Jul', revenue: 52000 },
    { month: 'Aug', revenue: 49000 },
    { month: 'Sep', revenue: 55000 },
    { month: 'Oct', revenue: 58000 },
    { month: 'Nov', revenue: 54000 },
    { month: 'Dec', revenue: 62000 },
];


// eslint-disable-next-line react/prop-types
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

function Sidebar() {
    return (
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
    );
}

const Dashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme();


    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <Header />

            <div className="flex">
                {/* Sidebar - Desktop */}
                <aside className="hidden w-[240px] flex-col border-r bg-background md:flex">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {/* Stats Overview */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$45,231.89</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">
                                    +180.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12,234</div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    Sales and Revenue Overview for the past 12 months
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <XAxis
                                                dataKey="month"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#8884d8"
                                                fill="url(#gradient)"
                                                fillOpacity={0.2}
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest transactions and updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={`https://avatar.vercel.sh/${i}`} alt="Avatar" />
                                                <AvatarFallback>OM</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">User #{i}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Made a purchase of ${Math.floor(Math.random() * 1000)}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                {Math.floor(Math.random() * 60)}m ago
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;