"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PatternTypeResponse } from "./types";

export const columns: ColumnDef<PatternTypeResponse>[] = [
  {
    accessorKey: "alias",
    header: "Alias",
  },
  {
    accessorKey: "description",
    header: "Descripción",
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
