'use client';
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
import ResponsibleForm from "./form";
import { useGetAllResponsible } from "./hook/useResponsible";

export default function ResponsiblePage() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const { data, isLoading } = useGetAllResponsible();
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <h2 className="text-center my-4 font-semibold">
          Consultar Responsables
        </h2>
        <div className="flex justify-end mb-3">
          <DialogTrigger asChild>
            <Button>Crear Responsable</Button>
          </DialogTrigger>
        </div>
        <DataTable
          columns={columns}
          data={data ?? []}
          isLoading={isLoading}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Responsable</DialogTitle>
            <ResponsibleForm closeModal={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
