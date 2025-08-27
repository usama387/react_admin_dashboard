import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Clock,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Productivity", href: "/productivity", icon: Clock },
];

const buttonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    transition: { duration: 0.2 },
  },
};

const Sidebar = () => {
  return (
    <AnimatePresence>
      {/* Only visible on lg and above */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        exit={{ x: -250 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "hidden lg:flex lg:flex-col lg:static lg:h-screen lg:w-72 bg-gradient-to-b from-red-50 to-red-100 border-r border-red-200/50 shadow-lg"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 px-6 border-b border-red-200/50">
          <h1 className="text-2xl font-bold text-red-600 tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 space-y-3">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center w-full justify-start gap-4 h-12 text-lg font-medium px-4 rounded-xl transition-all",
                      isActive
                        ? "bg-red-500 text-white shadow-md"
                        : "text-red-600 hover:bg-red-50/80 hover:text-red-700"
                    )
                  }
                >
                  <Icon className="h-6 w-6" />
                  {item.name}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-red-200/50 space-y-3">
          <button className="flex items-center w-full gap-4 h-12 text-lg font-medium text-red-600 hover:bg-red-50/80 hover:text-red-700 rounded-xl px-4">
            <Settings className="h-6 w-6" />
            Settings
          </button>
          <button className="flex items-center w-full gap-4 h-12 text-lg font-medium text-red-600 hover:bg-red-50/80 hover:text-red-700 rounded-xl px-4">
            <HelpCircle className="h-6 w-6" />
            Help
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
