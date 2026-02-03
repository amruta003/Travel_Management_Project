import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUsers,
  faInbox,
  faUserCheck,
  faBoxOpen,
  faLifeRing,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

function AdminSideBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: faGauge },
    { name: "User Management", path: "/admin/user-management", icon: faUsers },
    { name: "Inbox", path: "/admin/inbox", icon: faInbox },
    { name: "Agent Approval", path: "/admin/agent-approval", icon: faUserCheck },
    { name: "Travel Package Approval", path: "/admin/travel-package-approval", icon: faBoxOpen },
    { name: "Support Tickets", path: "/admin/support-tickets", icon: faLifeRing },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden fixed top-20 left-2 bg-blue-600 text-white p-2 rounded-lg z-50"
      >
        ☰
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen mt-[80px] bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 
        transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">

          {/* Menu List */}
          <ul className="space-y-2 font-medium">

            {menuItems.map((item, index) => {
              const active = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition
                      ${active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"}
                    `}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-5 h-5 ${active ? "text-white" : "text-gray-500 dark:text-gray-400"}`}
                    />
                    <span className="ms-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}

          </ul>

          {/* Bottom Sign Out */}
          <ul className="border-t mt-4 pt-4 border-gray-300 dark:border-gray-700">
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="w-full text-left flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                <span className="ms-3">Sign Out</span>
              </button>
            </li>
          </ul>

        </div>
      </aside>
    </>
  );
}


export default AdminSideBar