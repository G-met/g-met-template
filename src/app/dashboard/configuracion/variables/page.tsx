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
import { useObtenerVariables } from "../../hooks/useVariables";
import VariableForm from "./form";

export default function Variable() {
  const { variables, isLoading } = useObtenerVariables();
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
        <h2 className="text-center my-4 font-semibold">Consultar Variables</h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Variable</Button>
        </div>
        <DataTable columns={columns} data={variables} isLoading={isLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Variable</DialogTitle>
            <DialogDescription>
              Ingresa la informacion solicitada
            </DialogDescription>
          </DialogHeader>
          <VariableForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
