"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { obtenerFrecuencias } from "../../hooks/useFrecuencia";
import FrecuenciaForm from "./form";

export default function Frecuencia() {
  const { frecuencias, isLoading } = obtenerFrecuencias();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Dialog
        open={isOpenModal}
        onOpenChange={(value) => setIsOpenModal(value)}
      >
        <h2 className="text-center my-4 font-semibold">
          Consultar Frecuencias
        </h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Frecuencia</Button>
        </div>
        <DataTable columns={columns} data={frecuencias} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Frecuencia</DialogTitle>
            <DialogDescription>
              Ingresa la informacion solicitada
            </DialogDescription>
          </DialogHeader>
          <FrecuenciaForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
