import { isBefore, isValid, parseISO, format, subDays, differenceInDays } from "date-fns";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BonusStatus from "../../components/BonusStatus";
import DialyBonus from "../../components/DialyBonus";
import { getBonusReport } from "../../api/report";
import Card from "../../components/Card";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { hasRole } = useContext(AuthContext);
  const [bonusData, setBonusData] = useState(null);
  const [startDate, setStartDate] = useState(() =>
    format(subDays(new Date(), 7), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd")
  );

  const validateDates = useCallback(() => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (!isValid(start) || !isValid(end)) {
      toast.error("Por favor, ingresa fechas válidas.");
      return false;
    }

    if (isBefore(end, start)) {
      toast.error("La fecha de inicio no puede ser mayor que la fecha de fin.");
      return false;
    }

    if (differenceInDays(end, start) > 10) {
      toast.error("El rango de fechas no puede ser mayor a 10 días.");
      setStartDate(format(subDays(new Date(), 7), "yyyy-MM-dd"));
      setEndDate(format(new Date(), "yyyy-MM-dd"));
      return false;
    }

    return true;
  }, [startDate, endDate]);

  const fetchData = useCallback(async () => {
    if (!validateDates()) return;

    try {
      const response = await getBonusReport({ startDate, endDate });

      console.log("Datos del reporte:", response.data);
      const {
        totalBonuses,
        redeemedBonuses,
        nonRedeemedBonuses,
        dailyRedeemedBonuses,
      } = response.data;
      setBonusData({
        totalBonuses,
        redeemedBonuses,
        nonRedeemedBonuses,
        dailyRedeemedBonuses,
      });

      
    } catch (error) {
      toast.error("Error al obtener los datos del reporte.");
      console.error("Error al obtener los datos del reporte:", error);
    }
  }, [startDate, endDate, validateDates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!bonusData) {
    return <p>Cargando...</p>;
  }

  if (!hasRole("admin") && !hasRole("supervisor")) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-center gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
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
