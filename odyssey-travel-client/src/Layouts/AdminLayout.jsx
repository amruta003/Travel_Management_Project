import React from 'react'
import AdminNavBar from './../components/Navbar/Admin/AdminNavBar';
import AdminSidebar from '../components/Navbar/Admin/AdminSideBar';
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
      <AdminSidebar />
      <AdminNavBar />
      <div className='mt-[80px] ms-64 '>
        <Outlet />   {/* Pages load here */}
        <footer className="text-center text-muted small py-4 dark:text-white">
          © 2025 Odyssey Tours & Travels. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default AdminLayout
