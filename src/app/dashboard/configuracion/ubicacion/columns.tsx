import { ColumnDef } from "@tanstack/react-table";
import { Ubicacion } from "./types/types";

export const columns: ColumnDef<Ubicacion, any>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey:"fecha_creacion",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("fecha_creacion"));
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
  }
];
