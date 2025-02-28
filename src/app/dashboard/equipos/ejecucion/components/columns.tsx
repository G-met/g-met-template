"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ListarEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/listarEjecucionEquipos.dto";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
export const columns: ColumnDef<ListarEjecucionDTO>[] = [
  {
    accessorKey: "codigo",
    header: "codigo",
  },
  {
    accessorKey: "responsable",
    header: "responsable",
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
    size: 200, // Establece un ancho fijo de 200px
    cell: ({ row }) => {
      const observaciones = row.getValue("observaciones") as string;
      return (
        <p
          className="max-w-xs max-h-[300px] overflow-y-auto"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {observaciones}
        </p>
      );
    },
  },
  {
    accessorKey: "fechaEjecucion",
    header: "fecha Ejecucion",
  },
  {
    accessorKey: "equipoDescripcion",
    header: "Descripcion del equipo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documentos = row.original?.documentos;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              {documentos?.length ? (
                <>
                  <DropdownMenuSubTrigger>Documentos</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {documentos?.map((e) => (
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
            <DropdownMenuItem> + Agregar Documentos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
