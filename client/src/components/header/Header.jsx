import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const { userLogOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    userLogOut();
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between py-3 w-11/12 md:w-10/12 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12 h-12" src="/logo.webp" alt="Logo" />
          <p className="text-lg font-bold">ZapCash</p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/"><Button variant="link">Home</Button></Link>
          <Link to="/tasks"><Button variant="link">Tasks</Button></Link>
          <Link to="/contact"><Button variant="link">Contact</Button></Link>

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
            <Link to="/auth/login"><Button>Login</Button></Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md flex flex-col gap-3 p-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}><Button variant="link" className="w-full">Home</Button></Link>
          <Link to="/tasks" onClick={() => setMobileMenuOpen(false)}><Button variant="link" className="w-full">Tasks</Button></Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}><Button variant="link" className="w-full">Contact</Button></Link>

          {user ? (
            <Button onClick={handleLogout} className="w-full">Logout</Button>
          ) : (
            <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}><Button className="w-full">Login</Button></Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;