"use client";
import { useState } from "react";
import { columns } from "./columns";
import { useGetAllPatternExecutions } from "../../hook/usePatternExecution";
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

export default function EjecucionPatrones() {
  const { patternExecutions, isLoading } = useGetAllPatternExecutions();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: patternExecutions,
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
          columnId="codigo"
          placeholder="Buscar por código"
          className="max-w-sm"
        />
      </div>
      <DataTableV2 columns={columns} table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </>
  );
}
