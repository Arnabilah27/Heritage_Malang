import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface Route {
  name: string;
  path: string;
}

const navItems: Route[] = [
  { name: "Home", path: "/" },
  { name: "Maps", path: "/maps" },
  { name: "Destination", path: "/destination" },
  // { name: "Review", path: "/review" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-navbar shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between sm:justify-start">
        <img src="/logo.png" alt="logo" className="w-13 h-13" />

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-8">
            {navItems.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative navbar-text hover:transition-colors duration-200
                    ${
                      location.pathname === path
                        ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#513520]'
                        : ""
                    }
                    hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-[-4px] hover:after:w-full hover:after:h-[2px] hover:after:bg-[#513520]`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

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
        <ul className="sm:hidden px-6 py-2 space-y-2 bg-white shadow">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`relative text-navbar-link hover:text-navbar-link transition-colors duration-200
                  ${
                    location.pathname === path
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#513520]'
                      : ""
                  }
                  hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-[-4px] hover:after:w-full hover:after:h-[2px] hover:after:bg-[#513520]`}
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
