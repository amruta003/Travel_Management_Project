import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

import Admin_DashBoard from "../pages/Admin/admin_DashBoard/Admin_DashBoard";
import AgentApproval from "../pages/Admin/AgentApproval/AgentApproval";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import SupportTickets from "../pages/Admin/SupportTickets/SupportTickets";
import TravelPackageApproval from "../pages/Admin/TravelPackageApproval/TravelPackageApproval";

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
