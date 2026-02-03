import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../components/Navbar/User/UserSideBar'
import UserTopNavbar from '../components/Navbar/User/UserNavBar'
function UserLayout() {
  return (
    <div>
      <UserSidebar />
      <UserTopNavbar />

      <div
        style={{
          marginLeft: "240px",
          marginTop: "70px",
          padding: "20px",
        }}
      >
        <Outlet />   {/* Pages load here */}
      </div>
      <footer className="text-center text-muted small py-4">
            © 2025 Odyssey Tours & Travels. All rights reserved.
      </footer>
    </div>
  )
}

export default UserLayout