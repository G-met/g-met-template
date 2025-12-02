"use client";
import { queryValuesDTO } from "@/app/dashboard/common/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  obtenervalores: (args?: queryValuesDTO) => Promise<any>;
  existeSiguientePagina: boolean;
  currentPage: number;
}
const Paginador = ({ obtenervalores, existeSiguientePagina, currentPage }: Props) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const siguientePagina = async () => {
    setIsLoading(true);
    await obtenervalores({ page: currentPage + 1 });
    setIsLoading(false);
  };

  const paginaAnterior = async () => {
    setIsLoading(true);
    const page = Math.max(currentPage - 1, 1);
    await obtenervalores({ page });
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={paginaAnterior}
        disabled={currentPage === 1 || isLoading}
      >
        Anterior
      </Button>
      <Button className="cursor-auto" variant="secondary">
        {currentPage}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={siguientePagina}
        disabled={!existeSiguientePagina || isLoading}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Paginador;
