"use client";

import { useParams } from "next/navigation";
import { useGetPatternByCode } from "../../hook/usePattern";
import { PatternCharacteristicsForm } from "./components/pattern-characteristics-form";
import { PatternDetails } from "./components/pattern-details";

export default function DataCollection() {
  const { id } = useParams();
  const { pattern, isLoading, error, errorMessage } = useGetPatternByCode(
    id as string
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!pattern) {
    return <div>No se encontró el patrón</div>;
  }

  return (
    <div className="p-4">
      <PatternDetails pattern={pattern} />

      <div className="mt-4">
        <PatternCharacteristicsForm />
      </div>
    </div>
  );
}
