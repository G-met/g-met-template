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
import { SubMenuDocuments } from "../../components/SubMenuDocuments";
import { PatternResponse } from "../types";

export const columns: ColumnDef<PatternResponse>[] = [
  {
    accessorKey: "code",
    header: "codigo",
  },
  {
    accessorKey: "description",
    header: "descripcion",
  },
  {
    accessorKey: "brandName",
    header: "marca",
  },
  {
    accessorKey: "responsible",
    header: "Responsable",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documents = row.original?.documents;
      const code = row.original?.code;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/patrones/programar/${code}`}>
              <DropdownMenuItem>Programar</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/patrones/consultar/${code}`}>
              <DropdownMenuItem>Ver Patron</DropdownMenuItem>
            </Link>
            <SubMenuDocuments documentos={documents ?? []} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
