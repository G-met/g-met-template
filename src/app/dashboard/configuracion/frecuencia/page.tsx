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
import { useGetAllFrequencies } from "./hook/useFrequency";
import FrequencyForm from "./form";

export default function Frequency() {
  const { frequencies, isLoading } = useGetAllFrequencies();
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
          Configuración de Frecuencias
        </h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Frecuencia</Button>
        </div>
        <DataTable columns={columns} data={frequencies} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Frecuencia</DialogTitle>
            <DialogDescription>
              Ingresa la información solicitada
            </DialogDescription>
          </DialogHeader>
          <FrequencyForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
