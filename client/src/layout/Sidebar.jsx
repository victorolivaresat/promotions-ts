import { FaChartBar, FaTicketAlt, FaUser, FaFileInvoice  } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700 text-center">
        apuestatotal
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <a href="/" className="block p-2 rounded hover:bg-gray-700">
              <FaChartBar className="inline mr-2" />
              Panel
            </a>
          </li>
          <li>
            <a href="/bonus" className="block p-2 rounded hover:bg-gray-700">
              <FaTicketAlt className="inline mr-2" />
              Bonos
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              <FaUser className="inline mr-2" />
              Usuarios
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              <FaFileInvoice className="inline mr-2" />
              Reportes
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
