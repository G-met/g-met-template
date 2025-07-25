"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MagnitudResponse } from "./types";

export const columns: ColumnDef<MagnitudResponse>[] = [
  {
    accessorKey: "alias",
    header: "Alias",
  },
  {
    accessorKey: "descripcion",
    header: "Descripcion",
  },
  {
    accessorKey: "fecha_creacion",
    header: "Fecha Creacion",
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
  },
];
