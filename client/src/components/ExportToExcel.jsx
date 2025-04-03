import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa"; 

const ExportToExcel = ({ data, fileName = "reporte", sheetName = "Datos" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const finalFileName = `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, finalFileName);
  };

  return (
    <button
      onClick={handleExport}
      className="p-2 bg-green-500 text-white hover:bg-green-600 text-sm"
    >
      <FaFileExcel className="inline" />
    </button>
  );
};

export default ExportToExcel;
