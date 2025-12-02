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
import { Documentos } from "@/app/dashboard/common/types";
import { FormEjecucionEquipo } from "./form";

interface Props {
  documentos: Documentos[] | undefined;
  ejecucionEquipoId: string;
}
const DropdownMenuEjecucion = ({ documentos, ejecucionEquipoId }: Props) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  {documentos?.map((doc) => (
                    <DropdownMenuItem key={doc.url}>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        href={doc.url ?? ""}
                      >
                        {doc.name}
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
            equipmentExecutionId={ejecucionEquipoId}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DropdownMenuEjecucion;
