"use client";
import { useMemo, useState } from "react";
import { columns } from "./columns";
import { useGetAllEquipments } from "../hook/useEquipment";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableV2 } from "@/components/data-table-v2";
import { DataTableFilterInput } from "@/components/data-table-filter-input";

export default function ConstultarEquipos() {
  const { equipments, isLoading } = useGetAllEquipments();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: equipments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Equipos</h2>
      <div className="flex items-center py-4">
        <DataTableFilterInput
          table={table}
          columnId="code"
          placeholder="Buscar por codigo"
          className="max-w-sm"
        />
      </div>
      <DataTableV2 columns={columns} table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}
