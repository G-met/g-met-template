"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PatternExecutionResponse } from "../../types/patternExecution.types";

export const columns: ColumnDef<PatternExecutionResponse>[] = [
  {
    accessorKey: "code",
    header: "codigo",
  },
  {
    accessorKey: "responsible",
    header: "responsable",
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
    header: "fecha Ejecucion",
  },
  {
    accessorKey: "patternDescription",
    header: "Descripcion del patron",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documents = row.original?.documents;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              {documents?.length ? (
                <>
                  <DropdownMenuSubTrigger>Documentos</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {documents?.map((e) => (
                      <>
                        <DropdownMenuItem>
                          <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href={e.url ?? ""}
                          >
                            {e.name}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ))}
                  </DropdownMenuSubContent>
                </>
              ) : (
                <DropdownMenuItem>No hay Documentos</DropdownMenuItem>
              )}
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
