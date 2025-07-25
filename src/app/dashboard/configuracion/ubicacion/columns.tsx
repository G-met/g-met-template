import { ColumnDef } from "@tanstack/react-table";
import { Ubicacion } from "./types/types";

export const columns: ColumnDef<Ubicacion, any>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "clienteId",
    header: "Cliente ID",
  },
];
