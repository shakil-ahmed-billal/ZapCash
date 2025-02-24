import useAuth from "@/hooks/useAuth";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const { userLogOut , user } = useAuth()

    console.log(user);

    const handleLogout = () => {
        userLogOut();
        setMobileMenuOpen(false);
    };

    return (
        <header className="w-full bg-white dark:bg-[#111827] shadow-md transition-all duration-300">
            <div className="flex items-center justify-between py-4 px-6 md:px-12">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img className=" h-12" src="/logo.png" alt="Logo" />

                </Link>

                <div className="flex items-center gap-5">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/"><Button variant="ghost" className="dark:text-white">Home</Button></Link>
                        <Link to="/tasks"><Button variant="ghost" className="dark:text-white">Tasks</Button></Link>
                        <Link to="/contact"><Button variant="ghost" className="dark:text-white">Contact</Button></Link>
                    </nav>
                    <div className="flex items-center gap-5">
                        {/* Theme Toggle */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="dark:border-gray-600">
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

                        {/* User Profile */}
                        <div className="hidden md:flex">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user.photoURL || "/default-avatar.png"} alt="User Avatar" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link to="/auth/login"><Button className="">Login</Button></Link>
                            )}
                        </div>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-900 dark:text-white"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav
                className={`md:hidden bg-white dark:bg-[#111827] transition-all duration-300 shadow-md flex flex-col gap-3 p-5 absolute w-full left-0 ${mobileMenuOpen ? "top-16 opacity-100" : "-top-96 opacity-0"
                    }`}
            >
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="link" className="w-full dark:text-white">Home</Button>
                </Link>
                <Link to="/tasks" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="link" className="w-full dark:text-white">Tasks</Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="link" className="w-full dark:text-white">Contact</Button>
                </Link>

                {user ? (
                    <Button onClick={handleLogout} className="w-full">Logout</Button>
                ) : (
                    <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full ">Login</Button>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
