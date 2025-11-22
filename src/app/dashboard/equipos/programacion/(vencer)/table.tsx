"use client";
import { useState } from "react";
import { columns } from "./columns";
import { useGetAllEquipmentSchedules } from "../../hook/useEquipmentSchedule";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableV2 } from "@/components/data-table-v2";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableFilterInput } from "@/components/data-table-filter-input";

export default function ProgramacionEquipos() {
  const { equipmentSchedules, isLoading } = useGetAllEquipmentSchedules();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: equipmentSchedules,
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
    <>
      <div className="flex items-center py-4">
        <DataTableFilterInput
          table={table}
          columnId="code"
          placeholder="Buscar por código"
          className="max-w-sm"
        />
      </div>
      <DataTableV2 columns={columns} table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </>
  );
}
