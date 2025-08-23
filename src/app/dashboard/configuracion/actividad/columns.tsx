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
    header: "Fecha Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <>
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      );
    },
  },
];
