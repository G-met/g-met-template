"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import EditarPatronesBasicos from "./basicos";
import { useEffect } from "react";
import EditarDatosmetrologicos from "./metrologicos";
import EditarDatosComplementarios from "./complementarios";
import { obtenerPatronPorCodigo } from "@/app/dashboard/hooks/usePatron";
export default function Equipo() {
  const params = useParams<{ codigo: string }>();
  const { obtener, patron, isLoading } = obtenerPatronPorCodigo(params.codigo);
  useEffect(() => {
    obtener();
  }, []);
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Editar Patron</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        {patron === undefined ? (
          <p>Loading</p>
        ) : (
          <>
            <TabsContent value="basicos">
              <EditarPatronesBasicos patron={patron} />
            </TabsContent>
            <TabsContent value="metrologicos">
              <EditarDatosmetrologicos patron={patron} />
            </TabsContent>
            <TabsContent value="complementarios">
              <EditarDatosComplementarios patron={patron} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
}
