import { Button } from "@/components/ui/button";
import { Zap, Menu, Bell, User, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: Settings },
    { label: "New Complaint", path: "/complaint", icon: Bell },
    { label: "Track Ticket", path: "/track", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-primary shadow-corporate border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">ElectricCare</h1>
              <p className="text-xs text-white/80">Complaint Management System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={`text-white hover:text-primary hover:bg-white/10 ${
                  isActive(item.path) ? "bg-white/20 text-white" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2 mb-4 animate-fade-in">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    isActive(item.path) ? "bg-white/20" : ""
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}