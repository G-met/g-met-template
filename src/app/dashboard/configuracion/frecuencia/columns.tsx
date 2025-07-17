"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FrecuenciaResponse } from "./types";

export const columns: ColumnDef<FrecuenciaResponse>[] = [
  {
    accessorKey: "descripcion",
    header: "Descripcion",
  },
  {
    accessorKey: "cantidad_dias",
    header: "Cantidad Dias",
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
