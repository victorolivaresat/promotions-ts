import { useEffect, useState, useMemo } from "react";
import { getBetTicketsReport } from "../api/report";
import ExportToExcel from "./ExportToExcel";
import { format } from "date-fns";
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { FiLoader } from "react-icons/fi";

const Report = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "bonusCode",
        header: "Código del Bono",
      },
      {
        accessorKey: "redeemedBy",
        header: "Canjeado Por",
      },
      {
        accessorKey: "redeemedAt",
        header: "Fecha de Canje",
        cell: ({ getValue }) => {
          const rawDate = getValue();
          return rawDate ? format(new Date(rawDate), "dd/MM/yyyy HH:mm") : "-";
        },
      },
      {
        accessorKey: "documentNumber",
        header: "Número de Documento",
      },
      {
        accessorKey: "documentType",
        header: "Tipo de Documento",
      },
      {
        accessorKey: "clientName",
        header: "Nombre del Cliente",
      },
      {
        accessorKey: "ticketCode",
        header: "Código del Ticket",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getBetTicketsReport();
        setRows(response.data);
      } catch (error) {
        console.error(
          "Error al obtener el reporte de tickets de apuesta:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Función para formatear filas antes de exportarlas
  const formatRowsForExport = (rows) => {
    return rows.map((row) => {
      const formattedRow = { ...row.original };
      if (formattedRow.redeemedAt) {
        formattedRow.redeemedAt = format(new Date(formattedRow.redeemedAt), "dd/MM/yyyy HH:mm");
      }
      return formattedRow;
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Reporte de Tickets de Apuesta
          {loading && (
            <FiLoader className="animate-spin text-blue-500 text-xl" />
          )}
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="border-3 border-gray-200 p-1"
            onChange={(e) => table.setGlobalFilter(e.target.value || undefined)}
          />
          <ExportToExcel
            data={formatRowsForExport(table.getFilteredRowModel().rows)}
            fileName="reporte_tickets"
            sheetName="Tickets"
          />
        </div>
      </div>
      {table.getRowModel().rows.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          No hay datos para mostrar.
        </div>
      ) : (
        <>
          <table className="table-auto w-full text-xs border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" && (
                            <span className="ml-2">▲</span>
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <span className="ml-2">▼</span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`border border-gray-300 px-4 py-2 ${
                        cell.column.id === "bonusCode" ? "text-green-500" : ""
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <div>
              Página{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </strong>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
