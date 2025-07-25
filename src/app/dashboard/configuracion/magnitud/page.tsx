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
import { obtenerMagnitudes } from "../../hooks/useMagnitud";
import FromMagnitude from "./form";

export default function Magnitude() {
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);
  const { magnitudes, isLoading } = obtenerMagnitudes();
  return (
    <>
      <Dialog open={open} onOpenChange={SetOpen}>
        <h2 className="text-center my-4 font-semibold">Consultar Magnitudes</h2>
        <div className="flex justify-end mb-3">
          <DialogTrigger asChild>
            <Button>Crear Magnitud</Button>
          </DialogTrigger>
        </div>
        <DataTable columns={columns} data={magnitudes} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Magnitud</DialogTitle>
            <FromMagnitude closeModal={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
