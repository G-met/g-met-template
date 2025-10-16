"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import EditarPatronesBasicos from "./basicos";
import EditarDatosmetrologicos from "./metrologicos";
import EditarDatosComplementarios from "./complementarios";
import { useGetPatternByCode } from "@/app/dashboard/patrones/hook/usePattern";
export default function ConsultarPatron() {
  const params = useParams<{ codigo: string }>();
  const { pattern, isLoading } = useGetPatternByCode(params.codigo);
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Editar Patrón</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger value="basicos">Básicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrológicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        {pattern === undefined || isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <TabsContent value="basicos">
              <EditarPatronesBasicos pattern={pattern} />
            </TabsContent>
            <TabsContent value="metrologicos">
              <EditarDatosmetrologicos pattern={pattern} />
            </TabsContent>
            <TabsContent value="complementarios">
              <EditarDatosComplementarios pattern={pattern} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
}
