"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { BrandForm } from "./form";
import { BrandResponse } from "./types";
import { DialogDescription } from "@radix-ui/react-dialog";

export const columns: ColumnDef<BrandResponse>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "identification",
    header: "Identificación",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("createdAt"));
      return (
        <>
          {fecha.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isOpenModal, setIsOpenModal] = useState(false);
      const [isClickOpenModal, setIsClickOpenModal] = useState(false);
      const clickOpenModal = () => {
        setIsClickOpenModal(true);
      };

      const closeModal = () => {
        setIsOpenModal(false);
      };

      const onOpenChange = (value: boolean) => {
        if (isClickOpenModal && value === false) {
          setIsOpenModal(true);
        }
      };

      return (
        <>
          <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
              <DropdownMenuItem onClick={clickOpenModal}>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            open={isOpenModal}
            onOpenChange={(value) => setIsOpenModal(value)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Marca</DialogTitle>
                <DialogDescription>
                  Ingresa la informacion solicitada
                </DialogDescription>
              </DialogHeader>
              <BrandForm
                isEditing={true}
                brand={row.original}
                closeModal={closeModal}
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
