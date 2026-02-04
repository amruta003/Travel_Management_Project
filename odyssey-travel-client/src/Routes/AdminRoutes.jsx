import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

import Admin_DashBoard from "../pages/admin/admin_DashBoard/Admin_DashBoard";
import AgentApproval from "../pages/admin/AgentApproval/AgentApproval";
import UserManagement from "../pages/admin/UserManagement/UserManagement";
import SupportTickets from "../pages/admin/SupportTickets/SupportTickets";
import TravelPackageApproval from "../pages/admin/TravelPackageApproval/TravelPackageApproval";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Parent route with layout */}
      <Route path="/" element={<AdminLayout />}>

        {/* Nested routes (relative paths) */}         {/* /admin */}
        <Route path="dashboard" element={<Admin_DashBoard />} />   {/* /admin/dashboard */}
        <Route path="agent-approval" element={<AgentApproval />} /> {/* /admin/agent-approval */}
        <Route path="user-management" element={<UserManagement />} /> {/* /admin/user-management */}
        <Route path="support-tickets" element={<SupportTickets />} /> {/* /admin/support-tickets */}
        <Route path="travel-package-approval" element={<TravelPackageApproval />} /> {/* /admin/travel-package-approval */}

      </Route>
    </Routes>
  );
}
