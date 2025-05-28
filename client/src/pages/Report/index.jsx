import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BetTickets from "../../components/BetTickets";
import BlockedBetTickets from "../../components/BlockedBetTickets";

const Dashboard = () => {
  const { hasRole } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  const allowedRoles = ["admin", "supervisor"];
  if (!allowedRoles.some(role => hasRole(role))) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  // Definimos la configuración de pestañas en un solo sitio
  const tabs = [
    {
      label: "Bonos Bloqueados",
      Content: BlockedBetTickets,
    },
    {
      label: "Tickets de Apuesta",
      Content: BetTickets,
    },
  ];

  const baseBtnClasses = "inline-block p-4 rounded-t-lg";
  const activeClasses = "text-blue-600 bg-gray-100 active-tab";
  const inactiveClasses = "hover:text-gray-600 hover:bg-gray-50";

  return (
    <div className="mt-4 flex flex-col gap-6 mx-auto">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <li key={idx} className="me-2">
            <button
              type="button"
              aria-current={activeTab === idx ? "page" : undefined}
              className={`${baseBtnClasses} ${
                activeTab === idx ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="bg-white shadow-lg rounded-b-xl border border-gray-100 p-6">
        {(() => {
          const { Content } = tabs[activeTab];
          return <Content />;
        })()}
      </div>
    </div>
  );
};

export default Dashboard;
