"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { EquipmentDetail } from "../../types";
import { useEffect, useState } from "react";
import { useUpdateMetrologicalDataEquipment } from "../../hook/useEquipment";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  code: z.string({ description: "codigo requerido" }),
  emp: z.coerce
    .string({ description: "emp requerido" })
    .transform((val) => Number(val)),
  scaleDivision: z.coerce
    .string({ description: "division_escala requerido" })
    .transform((val) => Number(val)),
  resolution: z.coerce
    .string({ description: "resolucion requerido" })
    .transform((val) => Number(val)),
  minimumRange: z.coerce
    .string({ description: "rango_minimo requerido" })
    .transform((val) => Number(val)),
  maximumRange: z.coerce
    .string({ description: "rango_maximo requerido" })
    .transform((val) => Number(val)),
});
interface Props {
  equipment: EquipmentDetail;
}
function EditarDatosmetrologicos({ equipment }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  const { update, error, errorMessage, isLoading } = useUpdateMetrologicalDataEquipment();

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: equipment.code,
      scaleDivision: equipment.metrologicalData?.scaleDivision,
      emp: equipment.metrologicalData?.emp,
      maximumRange: equipment.metrologicalData?.maximumRange,
      minimumRange: equipment.metrologicalData?.minimumRange,
      resolution: equipment.metrologicalData?.resolution,
    },
  });
  useEffect(() => {}, []);

  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      equipmentCode: values.code,
      data: {
        scaleDivision: values.scaleDivision,
        emp: values.emp,
        maximumRange: values.maximumRange,
        minimumRange: values.minimumRange,
        resolution: values.resolution,
      },
    });

    form.reset();
    toast({
      title: "Equipo se edito correctamente",
      variant: "success",
    });
    router.push("/dashboard/equipos/consultar");
  }
  if (!equipment.metrologicalData) {
    return <p>El equipo no tiene datos metrologicos</p>;
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Equipo</FormLabel>
                  <FormControl>
                    <Input {...field} value={equipment?.code} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scaleDivision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division de escala</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emp</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maximumRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Maximo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minimumRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Minimo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolucion</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            style={{ display: !isDisabled ? "none" : "block" }}
            onClick={() => setIsDisabled(false)}
            className="mx-auto"
          >
            Editar Equipo
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="mx-auto"
            style={{ display: isDisabled ? "none" : "block" }}
          >
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!isLoading ? "hidden" : "")
              }
            />
            Guardar Cambios
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}

export default EditarDatosmetrologicos;
