import { ColumnDef } from "@tanstack/react-table";
import { LocationResponse } from "./types";

export const columns: ColumnDef<LocationResponse>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "responsible.name",
    header: "Responsable",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("createdAt"));
      return (
        <>
          {fecha.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      );
    },
  },
];
