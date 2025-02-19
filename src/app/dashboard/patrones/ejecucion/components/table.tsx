"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useObtenerEjecucionPatrones } from "@/app/dashboard/hooks/useEjecucionPatron";
export default function EjecucionPatrones() {
  const { ejecuciones, isLoading } = useObtenerEjecucionPatrones();
  return (
    <>
      <DataTable isLoading={isLoading} columns={columns} data={ejecuciones} />
    </>
  );
}
