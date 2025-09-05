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
} from "@/components/ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import UbicacionForm from "./form";
import { useGetAllLocations } from "./hook/useLocation";

export default function UbicacionTable() {
  const { locations, isLoading } = useGetAllLocations();
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
          Consultar Ubicaciones
        </h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Ubicación</Button>
        </div>
        <DataTable columns={columns} data={locations} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Ubicación</DialogTitle>
            <DialogDescription>
              Ingresa la información solicitada
            </DialogDescription>
          </DialogHeader>
          <UbicacionForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
