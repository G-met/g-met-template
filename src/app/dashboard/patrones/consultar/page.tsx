"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAllPatterns } from "../hook/usePattern";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/data-table-pagination";

export default function ConsultarPatrones() {
  const { patterns, isLoading } = useGetAllPatterns();
  const table = useReactTable({
    data: patterns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Patrones</h2>
      <DataTable columns={columns} table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}
