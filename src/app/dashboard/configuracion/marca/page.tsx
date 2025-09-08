"use client";
import { Button } from "@/components/ui/button";

import { useGetAllBrands } from "./hook/useBrand";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BrandForm } from "./form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Brand() {
  const { brands, isLoading } = useGetAllBrands();
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
        <h2 className="text-center my-4 font-semibold">Configuración de Marcas</h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Marca</Button>
        </div>
        <DataTable columns={columns} data={brands} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Marca</DialogTitle>
            <DialogDescription>
              Ingresa la información solicitada
            </DialogDescription>
          </DialogHeader>
          <BrandForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
