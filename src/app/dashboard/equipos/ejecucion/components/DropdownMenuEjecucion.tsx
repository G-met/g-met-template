"use client";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Documentos } from "@/app/api/common/types";
import { FormEjecucionEquipo } from "./form";

interface Props {
  documentos: Documentos[] | undefined;
  ejecucionEquipoId: string;
}
const DropdownMenuEjecucion = ({ documentos, ejecucionEquipoId }: Props) => {
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);
  return (
    <Dialog open={open} onOpenChange={SetOpen}>
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
                    <DropdownMenuItem key={e.url}>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        href={e.url ?? ""}
                      >
                        {e.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </>
            ) : (
              <DropdownMenuItem>No hay Documentos</DropdownMenuItem>
            )}
          </DropdownMenuSub>
          <DialogTrigger asChild>
            <DropdownMenuItem> + Agregar Documentos</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir archivos ejecucion de equipos</DialogTitle>
          <FormEjecucionEquipo
            closeModal={closeModal}
            ejecucionEquipoId={ejecucionEquipoId}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DropdownMenuEjecucion;
