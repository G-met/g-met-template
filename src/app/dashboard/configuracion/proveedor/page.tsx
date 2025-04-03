"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useState } from "react";
import {
  useListadoProvedores,
  useCrearProveedor,
} from "../../hooks/useProveedor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProveedorForm } from "./form";

export default function Proveedor() {
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);
  const { proveedores, isLoading } = useListadoProvedores();
  return (
    <>
      <Dialog open={open} onOpenChange={SetOpen}>
        <h2 className="text-center my-4 font-semibold">
          Consultar Proveedores
        </h2>
        <div className="flex justify-end mb-3">
          <DialogTrigger asChild>
            <Button>Crear Proveedor</Button>
          </DialogTrigger>
        </div>
        <DataTable columns={columns} data={proveedores} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear proveedor</DialogTitle>
            <ProveedorForm closeModal={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
