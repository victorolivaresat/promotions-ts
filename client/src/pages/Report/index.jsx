import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BetTickets from "../../components/BetTickets";

const Dashboard = () => {
  const { hasRole } = useContext(AuthContext);

  if (!hasRole("admin") && !hasRole("supervisor")) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg">
      <BetTickets />
    </div>
  );
};

export default Dashboard;
