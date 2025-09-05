import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ProveedorForm } from "./form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateProviderProps } from "./types";

interface Props {
  proveedorDto: UpdateProviderProps;
}

export const DropDownMenuProveedor = ({ proveedorDto }: Props) => {
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);

  return (
    <>
      <Dialog open={open} onOpenChange={SetOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear proveedor</DialogTitle>
            <ProveedorForm
              proveedorDto={proveedorDto}
              closeModal={closeModal}
              isEditing={true}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
