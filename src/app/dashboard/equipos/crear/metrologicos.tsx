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
import { useCreateMetrologicalDataEquipment } from "../hook/useEquipment";

const formSchema = z.object({
  codigo: z.string({ description: "codigo requerido" }),
  emp: z
    .string({ description: "emp requerido" })
    .transform((val) => Number(val)),
  divisionEscala: z
    .string({ description: "division_escala requerido" })
    .transform((val) => Number(val)),
  resolucion: z
    .string({ description: "resolucion requerido" })
    .transform((val) => Number(val)),
  rangoMinimo: z
    .string({ description: "rango_minimo requerido" })
    .transform((val) => Number(val)),
  rangoMaximo: z
    .string({ description: "rango_maximo requerido" })
    .transform((val) => Number(val)),
  valorNominal: z
    .string({ description: "valor nominal requerido" })
    .transform((val) => Number(val)),
});

function CrearDatosmetrologicos() {
  const { create, error, errorMessage, isLoading } = useCreateMetrologicalDataEquipment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      divisionEscala: 0,
      emp: 0,
      rangoMaximo: 0,
      rangoMinimo: 0,
      resolucion: 0,
      valorNominal: 0,
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      emp: values.emp,
      scaleDivision: values.divisionEscala,
      resolution: values.resolucion,
      minimumRange: values.rangoMinimo,
      maximumRange: values.rangoMaximo,
      nominalValue: values.valorNominal,
      equipmentCode: values.codigo
    });

    form.reset();
    toast({
      title: "Equipo se guardo correctamente",
      variant: "success",
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese codigo del equipo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="divisionEscala"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division de escala</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese division de escala"
                      {...field}
                    />
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
                    <Input type="number" placeholder="Ingrese EMP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rangoMaximo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Maximo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese Rango Maximo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rangoMinimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Minimo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese Rango Minimo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolucion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolucion</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese Resolucion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valorNominal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Nominal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese Valor Nominal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="mx-auto">
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!isLoading ? "hidden" : "")
              }
            />
            Crear Datos Metrologicos Equipo
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

export default CrearDatosmetrologicos;
