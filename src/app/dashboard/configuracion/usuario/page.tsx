"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useState } from "react";

import { DialogWrapper } from "@/components/dialogWrapper";
import { UsuarioForm } from "./form";
import { useGetAllUsers } from "./hook/useUser";

export default function Proveedor() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { users, isLoading } = useGetAllUsers();
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <h2 className="text-center my-4 font-semibold">Consultar Usuarios</h2>
      <div className="flex justify-end mb-3">
        <Button onClick={() => setIsOpenModal(true)}>Crear Usuario</Button>
      </div>
      <DataTable columns={columns} data={users} isLoading={isLoading} />
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={setIsOpenModal}
        title="Crear Usuario"
        description="Ingresa la informacion solicitada"
      >
        <UsuarioForm closeModal={closeModal} />
      </DialogWrapper>
    </>
  );
}
