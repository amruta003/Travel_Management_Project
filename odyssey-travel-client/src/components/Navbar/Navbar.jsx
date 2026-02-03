import LightDarkButton from "../LightDarkButton/LightDarkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthModal } from "../../context/AuthModalContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { openLogin } = useAuthModal();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Packages", href: "/packages" },
        { name: "AboutUs", href: "/aboutus" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 h-[80px] z-50">
            <nav className="max-w-[85rem] mx-auto px-4 py-3 flex items-center justify-between">

                {/* LEFT - LOGO */}
                <NavLink to="/" className="flex items-center text-3xl font-bold dark:text-white">
                    <img className="w-[55px] h-auto" src="/images/odyssey_logo.png" alt="Logo" />
                    <span>Odyssey</span>
                </NavLink>

                {/* CENTER NAV LINKS */}
                <div className="hidden sm:flex items-center gap-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) =>
                                `font-medium transition ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 hover:text-gray-500 dark:text-neutral-300 dark:hover:text-neutral-100"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <button
                        className="sm:hidden text-gray-700 dark:text-white text-xl"
                        onClick={() => setOpen(!open)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <LightDarkButton />

                    <button
                        type="button"
                        className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                        onClick={openLogin}
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {open && (
                <div className="sm:hidden px-4 pb-4">
                    <div className="flex flex-col gap-4 mt-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-blue-600" : "text-gray-700 dark:text-neutral-300"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
