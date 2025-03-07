"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/badge";
import clsx from "clsx";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormEjecucionPatron } from "./form";
import { EstadoProgramacion } from "@prisma/client";
import {
  Estatus,
  PatronProgramacionDto,
} from "@/app/api/programacion-patrones/application/dto/listadoPatronesProgramados.dto";
import { DropDownMenuEjecucionPatron } from "./DropDownMenu";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PatronProgramacionDto>[] = [
  {
    accessorKey: "codigo",
    header: "codigo",
  },
  {
    accessorKey: "descripcion",
    header: "descripcion",
  },
  {
    accessorKey: "fechaProgramacion",
    header: "Fecha programacion",
  },
  {
    accessorKey: "actividad",
    header: "Actividad",
  },
  {
    accessorKey: "frecuencia",
    header: "Frecuencia",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "alertaEstado",
    header: "Tiempo disponible",
    cell: ({ row }) => {
      //TODO: pasar esta logica a variantes
      const estatus = row.getValue<Estatus>("alertaEstado");
      return (
        <Badge
          className={clsx({
            "bg-green-500": estatus.color === "success",
            "bg-orange-500": estatus.color === "warning",
            "bg-red-500": estatus.color === "danger",
            "bg-red-700": estatus.color === "expired",
          })}
        >
          {estatus.descripcion}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const isCompleted =
        row.original.estado === EstadoProgramacion.COMPLETADO ? true : false;

      return (
        <DropDownMenuEjecucionPatron
          isCompleted={isCompleted}
          programacionPatronId={row.original.id}
        />
      );
    },
  },
];
