import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardWrapper({ children }) {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="top-0 left-0 w-full bg-gray-900 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="pr-4">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className="h-8 ml-4" />
          </Link>
        </div>

        <div className="hidden md:block">
          <Link className="ml-4 px-3 py-2 hover:underline text-xl" to="/dashboard">
            Links
          </Link>
          <Link
            className="ml-4 mr-3 px-3 py-2 hover:underline text-xl"
            to="/dashboard/profile"
          >
            Perfil
          </Link>
          <button className="px-4 py-2 bg-red-600 rounded-lg hover:opacity-70">
            <Link className="flex items-center" to="/singout">
              <span className="material-symbols-outlined text-white mr-2">
              logout
              </span>
              <span className="text-white text-base font-semibold">Cerrar Sesión</span>
            </Link>
          </button>
        </div>

        <div className="md:hidden pr-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button ml-4"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2"></rect>
              <rect x="4" y="11" width="16" height="2"></rect>
              <rect x="4" y="17" width="16" height="2"></rect>
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } md:hidden transition all duration-400 ease-in-out`}
      >
        <nav className="flex flex-col items-center justify-center">
          <Link
            to="/dashboard"
            className="block px-3 py-2 border-b-0 hover:underline justify-center text-xl"
          >
            Links
          </Link>
          <Link
            to="/dashboard/profile"
            className="block px-3 py-2 border-b-0 hover:underline justify-center text-xl"
          >
            Perfil
          </Link>
          <button className="mt-2 px-4 py-2 bg-red-600 rounded-lg hover:opacity-70">
            <Link className="flex items-center" to="/singout">
              <span className="material-symbols-outlined text-white mr-2">
                logout
              </span>
              <span className="text-white font-semibold">Cerrar Sesión</span>
            </Link>
          </button>
        </nav>
      </div>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
