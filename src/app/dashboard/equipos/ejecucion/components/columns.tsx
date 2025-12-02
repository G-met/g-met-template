"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EquipmentExecutionResponse } from "../../types/equipmentExecution.types";

import DropdownMenuEjecucion from "./DropdownMenuEjecucion";
export const columns: ColumnDef<EquipmentExecutionResponse>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "responsible",
    header: "Responsable",
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    size: 200, // Establece un ancho fijo de 200px
    cell: ({ row }) => {
      const observations = row.getValue("observations") as string;
      return (
        <p
          className="max-w-xs max-h-[300px] overflow-y-auto"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {observations}
        </p>
      );
    },
  },
  {
    accessorKey: "executionDate",
    header: "Fecha Ejecución",
  },
  {
    accessorKey: "equipmentDescription",
    header: "Descripción del Equipo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documents = row.original?.documents;
      const code = row.original?.code ?? "unknown";
      return (
        <DropdownMenuEjecucion documentos={documents} ejecucionEquipoId={code} />
      );
    },
  },
];
