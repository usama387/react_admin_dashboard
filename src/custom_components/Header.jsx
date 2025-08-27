import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Users", href: "/users" },
  { name: "Analytics", href: "/analytics" },
  { name: "Productivity", href: "/productivity" },
];

const Header = () => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-card border-b border-border/50 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <h2 className="text-2xl font-bold text-red-600 tracking-tight">
          Dashboard
        </h2>

        {/* Mobile Nav Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12 text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-card border border-border/50 rounded-lg shadow-lg"
            align="start"
          >
            {navigation.map((item) => (
              <DropdownMenuItem
                key={item.name}
                asChild
                className="text-base text-foreground hover:bg-red-50/80 hover:text-red-600 cursor-pointer"
              >
                <NavLink to={item.href}>{item.name}</NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
        >
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-12 w-12 rounded-full hover:bg-red-50/80 transition-colors"
            >
              <Avatar className="h-12 w-12 ring-2 ring-red-200">
                <AvatarImage src="/admin-avatar.png" alt="Admin" />
                <AvatarFallback className="bg-red-100 text-red-600 text-lg font-medium">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-card border-border/50 p-4 rounded-lg shadow-lg"
            align="end"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <p className="text-base font-semibold text-foreground">
                  Usama Razaaq (Admin)
                </p>
                <p className="text-sm text-muted-foreground">
                  usamarazaaq3@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50 my-2" />
            <DropdownMenuItem className="text-base hover:bg-red-50/80 hover:text-red-600 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base hover:bg-red-50/80 hover:text-red-600 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50 my-2" />
            <DropdownMenuItem className="text-base hover:bg-red-50/80 hover:text-red-600 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
