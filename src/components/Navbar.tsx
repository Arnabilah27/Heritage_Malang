import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Route {
  name: string;
  path: string;
}

const navItems: Route[] = [
  { name: "Home", path: "/" },
  { name: "Maps", path: "/maps" },
  { name: "Destination", path: "/destination" },
  { name: "Review", path: "/review" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MyCompany</h1>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition",
                  location.pathname === path ? "text-blue-600" : "text-gray-600"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="sm:hidden px-4 pb-4 space-y-2 bg-white shadow">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={cn(
                  "block text-sm font-medium hover:text-blue-600 transition",
                  location.pathname === path ? "text-blue-600" : "text-gray-700"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
