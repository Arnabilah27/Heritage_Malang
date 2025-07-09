import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiOpenBook } from "react-icons/gi";

interface Route {
  name: string;
  path: string;
}

const navItems: Route[] = [
  { name: "Beranda", path: "/" },
  { name: "Peta", path: "/peta" },
  { name: "Destinasi", path: "/destinasi" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPanduan, setShowPanduan] = useState(false); // ✅ modal state

  return (
    <>
      <nav className="bg-navbar shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between sm:justify-start">
          {/* Logo */}
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

            {/* Ikon Buku hanya di Mobile Menu */}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowPanduan(true);
                }}
                className="flex items-center gap-2 text-navbar-link hover:text-navbar-link transition-colors duration-200"
              >
                <span>Panduan</span>
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Ikon Buku Pojok Kanan Atas (Desktop Only) */}
      <button
        onClick={() => setShowPanduan(true)}
        className="hidden sm:block fixed top-4 right-10 z-[1000]"
        title="Panduan"
      >
        <GiOpenBook className="w-7 h-7 text-[#513520] hover:text-[#825c3b] transition-colors duration-200" />
      </button>

      {/* Modal Panduan (Iframe) */}
      {showPanduan && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative w-[90%] h-[90%] bg-white shadow-lg rounded-lg overflow-hidden">
            <button
              onClick={() => setShowPanduan(false)}
              className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              ✕
            </button>
            <iframe
              src="https://online.pubhtml5.com/kwxum/ibpi/"
              title="Panduan Buku"
              className="w-full h-full border-none"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
