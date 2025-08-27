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
import { Bell, Moon, Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-card border-b border-border/50 shadow-sm">
      <div className="flex items-center space-x-6">
        <h2 className="text-3xl font-bold text-red-600 tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
        >
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>

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
            forceMount
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
            <DropdownMenuItem className="text-base text-foreground hover:bg-red-50/80 hover:text-red-600 py-2 px-3 rounded-md cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base text-foreground hover:bg-red-50/80 hover:text-red-600 py-2 px-3 rounded-md cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50 my-2" />
            <DropdownMenuItem className="text-base text-foreground hover:bg-red-50/80 hover:text-red-600 py-2 px-3 rounded-md cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;