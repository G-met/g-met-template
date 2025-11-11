"use client";
import { useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAllPatterns } from "../hook/usePattern";
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

export default function ConsultarPatrones() {
  const { patterns, isLoading } = useGetAllPatterns();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: patterns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  console.log(table);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Patrones</h2>
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
