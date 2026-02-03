import { Outlet } from "react-router-dom";
import AgentSidebar from "../components/Navbar/Agent/AgentSideBar";
import AgentTopNavBar from "../components/Navbar/Agent/AgentTopNavBar";

export default function AgentLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <AgentSidebar />

      {/* Top Navbar */}
      <AgentTopNavBar />

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: "240px",   // width of sidebar
          marginTop: "70px",     // height of top navbar
          padding: "24px",
        }}
      >
        {/* 🔥 Nested pages render here */}
        <Outlet />
      </div>

      {/* Footer */}
      <footer
        style={{
          marginLeft: "240px",
        }}
        className="text-center text-gray-500 text-sm py-4 border-t bg-white"
      >
        © 2025 Odyssey Tours & Travels. All rights reserved.
      </footer>
    </div>
  );
}
