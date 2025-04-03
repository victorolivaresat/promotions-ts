import ExportToExcel from "./ExportToExcel";
import { useState, useMemo } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserTable = ({ users, onEdit, onDelete, onToggleStatus }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Usuario",
        accessorKey: "userName",
      },
      {
        header: "Estado",
        accessorKey: "isActive",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={row.original.isActive}
                onChange={() => onToggleStatus(row.original.id)}
              />
              <div
                className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 ${
                  row.original.isActive
                    ? "peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600"
                    : "peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600"
                } peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
              ></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {row.original.isActive ? "Activo" : "Inactivo"}
              </span>
            </label>
          </div>
        ),
      },
      {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              className="p-2 text-sm text-white bg-blue-500 flex items-center gap-1"
              onClick={() => onEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="p-2 text-sm text-white bg-red-500 flex items-center gap-1"
              onClick={() => onDelete(row.original.id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onToggleStatus]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="border-3 border-gray-200 p-1"
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        />
        <ExportToExcel
          data={table.getFilteredRowModel().rows.map((row) => row.original)}
          fileName="usuarios"
          sheetName="Usuarios"
        />
        </div>
      </div>
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
                  className="border border-gray-300 px-4 py-2 text-center"
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
    </div>
  );
};

export default UserTable;
