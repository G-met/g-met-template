"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { EquipmentResponse } from "../types";
import { SubMenuDocuments } from "../../components/SubMenuDocuments";

export const columns: ColumnDef<EquipmentResponse>[] = [
  {
    accessorKey: "code",
    header: "codigo",
  },
  {
    accessorKey: "description",
    header: "Descripcón",
  },
  {
    accessorKey: "brandName",
    header: "Marca",
  },
  {
    accessorKey: "responsible",
    header: "Responsable",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documents = row.original?.documents;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/equipos/programar/${row.getValue("code")}`}>
              <DropdownMenuItem>Programar</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/equipos/consultar/${row.getValue("code")}`}>
              <DropdownMenuItem>Ver Equipo</DropdownMenuItem>
            </Link>
            <SubMenuDocuments documentos={documents ?? []} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
