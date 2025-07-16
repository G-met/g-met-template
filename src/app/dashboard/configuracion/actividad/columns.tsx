"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityResponse } from "./types";

export const columns: ColumnDef<ActivityResponse>[] = [
  {
    accessorKey: "descripcion",
    header: "Nombre De la Actividad",
    cell: ({ row }) =>
      row.getValue<string>("descripcion")
  },
];
