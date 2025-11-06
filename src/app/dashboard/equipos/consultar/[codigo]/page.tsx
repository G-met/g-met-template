"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetEquipmentByCode } from "../../hook/useEquipment";
import { useParams } from "next/navigation";
import EditarEquiposBasicos from "./basicos";
import EditarDatosmetrologicos from "./metrologicos";
import EditarDatosComplementarios from "./complementarios";

export default function Equipo() {
  const params = useParams<{ codigo: string }>();
  const { equipment, isLoading } = useGetEquipmentByCode(params.codigo);

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Editar Equipo</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        {equipment === undefined ? (
          <p>Loading</p>
        ) : (
          <>
            <TabsContent value="basicos">
              <EditarEquiposBasicos equipment={equipment} />
            </TabsContent>
            <TabsContent value="metrologicos">
              <EditarDatosmetrologicos equipo={equipment} />
            </TabsContent>
            <TabsContent value="complementarios">
              <EditarDatosComplementarios equipo={equipment} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
}
