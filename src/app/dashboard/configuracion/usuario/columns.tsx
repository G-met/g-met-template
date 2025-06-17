"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserResponse } from "./types";

export const columns: ColumnDef<UserResponse>[] = [
  {
    accessorKey: "idCode",
    header: "Código Identificacion",
  },
  {
    accessorKey: "firstName",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "position",
    header: "Cargo",
  },
];
