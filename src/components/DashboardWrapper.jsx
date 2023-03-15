import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="flex items-center justify-between h-16 px-6 md:px-10">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">Logo</div>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link
              to="/dashboard"
              className="mx-4 text-gray-800 hover:text-gray-600"
            >
              Links
            </Link>
            <Link
              to="/dashboard/profile"
              className="mx-4 text-gray-800 hover:text-gray-600"
            >
              Profile
            </Link>
            <Link
              to="/singout"
              className="mx-4 text-gray-800 hover:text-gray-600"
            >
              Singout
            </Link>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 6H5v2h14V6zm0 6H5v2h14v-2zm0 6H5v2h14v-2z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
              >
                Links
              </Link>
              <Link
                to="/dashboard/profile"
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
              >
                Profile
              </Link>
              <Link
                to="/singout"
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
              >
                Singout
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div>{children}</div>
    </div>
  );
}
