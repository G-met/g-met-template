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
import PatternTypeForm from "./form";
import { useGetAllPatternTypes } from "./hook/usePatternType";

export default function PatternType() {
  const [open, SetOpen] = useState(false);
  const closeModal = () => SetOpen(false);
  const { patternTypes, isLoading } = useGetAllPatternTypes();
  return (
    <>
      <Dialog open={open} onOpenChange={SetOpen}>
        <h2 className="text-center my-4 font-semibold">
          Consultar Tipos de Patron
        </h2>
        <div className="flex justify-end mb-3">
          <DialogTrigger asChild>
            <Button>Crear Tipo de Patron</Button>
          </DialogTrigger>
        </div>
        <DataTable
          columns={columns}
          data={patternTypes ?? []}
          isLoading={isLoading}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Tipo de Patron</DialogTitle>
            <PatternTypeForm closeModal={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
