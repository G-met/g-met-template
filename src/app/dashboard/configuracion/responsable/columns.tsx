import { ColumnDef } from "@tanstack/react-table";
import { ResponsableResponse } from "./types";

export const columns: ColumnDef<ResponsableResponse, any>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "identificacion",
    header: "Identificación",
  },
];
