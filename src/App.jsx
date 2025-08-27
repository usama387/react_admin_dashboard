import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/DashboardPage";
import Users from "./pages/UsersPage";
import Analytics from "./custom_components/Analytics";
import Dashboard from "./custom_components/Dashboard";
import Productivity from "./pages/Productivity";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />   {/* Dashboard as default */}
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="productivity" element={<Productivity />} />
      </Route>
    </Routes>
  );
};

export default App;
