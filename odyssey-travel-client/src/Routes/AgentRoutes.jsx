import { Routes, Route } from "react-router-dom";

import AddPackage from "../pages/agent/AddPackages/AddPackages";
import Agent_DashBoard from "../pages/agent/Agent_DashBoard/Agent_DashBoard";
import BookingOverview from "../pages/agent/BookingsOverview/BookingOverview";
import EditAboutUsPage from "../pages/agent/EditAboutUs/EditAboutUsPage";
import MyPackages from "../pages/agent/MyPackages/MyPackages";
import SupportTicket from "../pages/agent/SupportTicket/SupportTicket";
// import AgentLogin from "../pages/Agent/AgentLogin/AgentLogin";

import AgentLayout from "../Layouts/AgentLayout";

export default function AgentRoutes() {
  return (
    <Routes>
      {/* Parent route with layout */}
      <Route path="/" element={<AgentLayout />}>

        {/* Nested routes (relative paths) */}
        <Route path="dashboard" element={<Agent_DashBoard />} /> {/* /agent/dashboard */}
        <Route path="add-package" element={<AddPackage />} /> {/* /agent/add-package */}
        <Route path="my-packages" element={<MyPackages />} /> {/* /agent/my-packages */}
        <Route path="booking-overview" element={<BookingOverview />} /> {/* /agent/booking-overview */}
        <Route path="edit-about-us" element={<EditAboutUsPage />} /> {/* /agent/edit-about-us */}
        <Route path="support-ticket" element={<SupportTicket />} /> {/* /agent/support-ticket */}
        {/* <Route path="login" element={<AgentLogin />} /> /agent/login */}

      </Route>
    </Routes>
  );
}