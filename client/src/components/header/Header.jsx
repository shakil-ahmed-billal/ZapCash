import {
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import { Bell, Download, LineChart, Menu, Moon, Settings, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { userLogOut, user } = useAuth();
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        userLogOut();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="md:px-20 px-5 flex h-14 items-center justify-between">
                {/* Logo and Desktop Navigation */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <LineChart className="h-6 w-6" />
                        <span className="font-bold">Dashboard</span>
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link to="/home" className="hover:text-primary">Home</Link>
                        <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
                        <Link to="/contact" className="hover:text-primary">Contact</Link>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="font-bold text-lg">Home</Link>
                            <Link href="/dashboard" className="font-bold text-lg">Dashboard</Link>
                            <Link href="/contact" className="font-bold text-lg">Contact</Link>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Right-side actions */}
                <div className="flex items-center space-x-2">
                    {/* Theme Toggle */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-5 w-5 transition-transform dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 transition-transform scale-0 dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                    </Button>

                    {/* User Profile Menu */}
                    <DropdownMenu>
                        {user ? <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger> : <Link to="/auth/login"><Button>Login</Button></Link>}
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email || "user@example.com"}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download Data</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
