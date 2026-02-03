import LDButton from '../../LightDarkButton/LightDarkButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";

import avtar from '../../../assets/images/avtars/platipus.jpg'

function UserNavBar() {
    // State to control mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);


    const navLinks = [
        { name: "Home", href: "/", active: true },
        // You can add more links here if needed
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 h-[80px] z-50">
            <nav className="max-w-[85rem] mx-auto px-4 py-3 flex items-center justify-between">

                {/* LEFT SECTION - Brand Logo */}
                <a
                    href="/"
                    className="flex items-center text-3xl font-bold dark:text-white hover:opacity-80 transition"
                >
                    <img
                        className="w-[55px] h-auto"
                        src="/images/odyssey_logo.png"
                        alt="Odyssey Logo"
                    />
                    <span className="ml-2">Odyssey</span>
                </a>

                {/* CENTER SECTION - Desktop Menu */}
                <div className="hidden sm:flex items-center gap-x-8 ">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-medium transition duration-200 ${link.active
                                ? "text-blue-500" // Active link color
                                : "text-gray-700 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-400" // Inactive link style
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* RIGHT SECTION - Mobile Toggle, Avatar, Theme Button */}
                <div className="flex items-center gap-4">

                    {/* Mobile Menu Button (Hamburger) - Visible only on mobile */}
                    <button
                        className="sm:hidden text-gray-700 dark:text-white text-xl p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>


                    {/* User Avatar */}
                    <img className="w-10 h-10 p-1 rounded-full ring-2 ring-blue-500" src={avtar} alt="User Avatar" />


                    {/* Light/Dark Mode Toggle Button */}
                    <LDButton />


                </div>
            </nav>

            {/* MOBILE DROPDOWN MENU - Shown when isOpen is true */}
            {isOpen && (
                <div className="sm:hidden px-4 pb-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                    <div className="flex flex-col gap-4 mt-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`font-medium p-2 rounded transition ${link.active
                                    ? "text-blue-500 bg-blue-50 dark:bg-gray-800"
                                    : "text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

        </header>
    );
}

export default UserNavBar;
