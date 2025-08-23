"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityResponse } from "./types";

export const columns: ColumnDef<ActivityResponse>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creacion",
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
