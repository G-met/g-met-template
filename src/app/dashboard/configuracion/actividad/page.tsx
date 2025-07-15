"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActividadForm from "./form";
import { obtenerActividades } from "../../hooks/useActividad";

export default function Actividad() {
  const { actividades, isLoading } = obtenerActividades();
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);
  return (
    <>
      <Dialog open={open} onOpenChange={SetOpen}>
        <h2 className="text-center my-4 font-semibold">
          Consultar Actividades
        </h2>
        <div className="flex justify-end mb-3">
          <DialogTrigger asChild>
            <Button>Crear Actividad</Button>
          </DialogTrigger>
        </div>
        <DataTable columns={columns} data={actividades} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Actividad</DialogTitle>
            <ActividadForm closeModal={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
