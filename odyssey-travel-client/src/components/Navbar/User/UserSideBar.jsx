import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faPlusCircle,
    faBoxOpen,
    faBook,
    faInfoCircle,
    faLifeRing,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

function UserSideBar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Sidebar menu items
    const menuItems = [
        { name: "Dashboard", path: "/user/dashboard", icon: faGauge },
        { name: "Browse Packages", path: "/user/browse-packages", icon: faBoxOpen },
        { name: "My Bookings", path: "/user/my-bookings", icon: faBook },
        { name: "Support Tickets", path: "/user/support", icon: faLifeRing },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="sm:hidden fixed top-24 left-2 bg-blue-600 text-white p-2 rounded-lg z-40 shadow-lg"
            >
                ☰
            </button>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen mt-[80px] bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 
        transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
            >
                <div className="h-full px-3 py-4 ">

                    {/* Menu List */}
                    <ul className="space-y-2 font-medium">

                        {menuItems.map((item, index) => {
                            const active = location.pathname === item.path;

                            return (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-5 py-3 rounded-xl transition
                      ${active
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 dark:text-gray-300 hover:-translate-y-1 hover:scale-95 hover:bg-gray-200 dark:hover:bg-gray-800 hover:rounded-xl hover:outline-2 hover:outline-offset-2 hover:outline-blue-500 "}
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
                                className="w-full text-left flex items-center rounded-xl text-gray-700 dark:text-gray-300 hover:-translate-y-1 hover:scale-95 hover:bg-red-500 dark:hover:bg-red-900 px-5 py-3 hover:outline-2 hover:outline-offset-2 hover:outline-red-300"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                                <span className="ms-3 font-medium">Sign Out</span>
                            </button>
                        </li>
                    </ul>

                </div>
            </aside>
        </>
    );
}


export default UserSideBar
