import { useEffect, useState } from "react";
import BonusStatus from "../../components/BonusStatus";
import DialyBonus from "../../components/DialyBonus";
import Card from "../../components/Card"; // Importar el nuevo componente Card

// Example mock data
const mockBonusData = {
  totalBonuses: 100,
  redeemedBonuses: 40,
  nonRedeemedBonuses: 60,
  dailyRedeemedBonuses: [
    { date: "2025-03-28", count: "5" },
    { date: "2025-03-29", count: "8" },
    { date: "2025-03-30", count: "12" },
    { date: "2025-03-31", count: "7" },
    { date: "2025-04-01", count: "6" },
    { date: "2025-04-02", count: "2" },
    { date: "2025-04-03", count: "0" },
  ],
};

const Dashboard = () => {
  const [bonusData, setBonusData] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await getBonusReport();
    //     const {
    //       totalBonuses,
    //       redeemedBonuses,
    //       nonRedeemedBonuses,
    //       dailyRedeemedBonuses,
    //     } = response.data;
    //     setBonusData({
    //       totalBonuses,
    //       redeemedBonuses,
    //       nonRedeemedBonuses,
    //       dailyRedeemedBonuses,
    //     });
    //   } catch (error) {
    //     console.error("Error al obtener los datos del reporte:", error);
    //   }
    // };

    // fetchData();

    // Usar datos simulados
    setBonusData(mockBonusData);
  }, []);

  if (!bonusData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <Card title="Estado de Bonos">
            <BonusStatus
              redeemed={bonusData.redeemedBonuses}
              nonRedeemed={bonusData.nonRedeemedBonuses}
            />
          </Card>
        </div>
        <div className="col-span-9">
          <Card title="Bonos Diarios">
            <DialyBonus dailyData={bonusData.dailyRedeemedBonuses} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
