import { FaChartBar, FaTicketAlt, FaUser, FaFileInvoice } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router";
import { useContext } from "react";

const Sidebar = () => {
  const { hasRole } = useContext(AuthContext);
  const location = useLocation();

  const routes = [
    {
      path: "/",
      label: "Panel",
      icon: <FaChartBar className="inline mr-2" />,
      roles: ["admin", "supervisor"],
    },
    {
      path: "/bonus",
      label: "Bonos",
      icon: <FaTicketAlt className="inline mr-2" />,
      roles: ["admin", "user"],
    },
    {
      path: "/user",
      label: "Usuarios",
      icon: <FaUser className="inline mr-2" />,
      roles: ["admin"],
    },
    {
      path: "/report",
      label: "Reportes",
      icon: <FaFileInvoice className="inline mr-2" />,
      roles: ["admin", "supervisor"],
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700 text-center">
        apuestatotal
      </div>
      <nav className="flex-1 p-4 mt-4">
        <ul className="space-y-4">
          {routes.map(
            ({ path, label, icon, roles }) =>
              roles.some((role) => hasRole(role)) && (
                <li key={path}>
                  <Link
                    to={path}
                    viewTransition
                    className={`block p-2 rounded hover:bg-gray-700 ${
                      location.pathname === path ? "active" : ""
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
