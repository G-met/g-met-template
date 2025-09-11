"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAllPatterns } from "../hook/usePattern";

export default function ConsultarPatrones() {
  const { patterns, isLoading } = useGetAllPatterns();

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Patrones</h2>
      <DataTable columns={columns} data={patterns} isLoading={isLoading} />
    </div>
  );
}
