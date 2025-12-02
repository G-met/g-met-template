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
import { useCreateComplementaryDataEquipment } from "../hook/useEquipment";
import { Cumple } from "@/app/dashboard/common/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  codigo: z.string({ description: "codigo requerido" }),
  descripcionEspecificaciones: z
    .string({
      description: "descripcionEspecificaciones requerido",
    })
    .optional(),
  cumpleEspecificacionInstalaciones: z.nativeEnum(Cumple),
  utilizaSoftware: z.nativeEnum(Cumple),
  descripcionSoftware: z.string().optional(),
  versionSoftware: z
    .string({ description: "versionSoftware requerido" })
    .optional(),
  fireware: z.string({ description: "fireware requerido" }).optional(),
  observaciones: z
    .string({ description: "observaciones requerido" })
    .optional(),
});
function CrearDatosmetrologicos() {
  const { create, error, errorMessage, isLoading } = useCreateComplementaryDataEquipment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      cumpleEspecificacionInstalaciones: Cumple.NO,
      descripcionEspecificaciones: "",
      descripcionSoftware: "",
      fireware: "",
      observaciones: "",
      utilizaSoftware: Cumple.NO,
      versionSoftware: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      specificationsDescription: values.descripcionEspecificaciones || "",
      meetsInstallationSpecifications: values.cumpleEspecificacionInstalaciones === Cumple.SI,
      usesSoftware: values.utilizaSoftware === Cumple.SI,
      softwareDescription: values.descripcionSoftware || null,
      softwareVersion: values.versionSoftware || null,
      firmware: values.fireware || null,
      observations: values.observaciones || null,
      equipmentCode: values.codigo,
    });

    form.reset();
    toast({
      title: "Dato complementarios se guardaron correctamente",
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
              name="descripcionEspecificaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion Especificaciones</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese Especificaciones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="versionSoftware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version software</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese version de software"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cumpleEspecificacionInstalaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cumple especificaciones instalaciones</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="elija una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Cumple.NO}>No</SelectItem>
                      <SelectItem value={Cumple.SI}>Si</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utilizaSoftware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utiliza software</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="elija una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Cumple.NO}>No</SelectItem>
                      <SelectItem value={Cumple.SI}>Si</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcionSoftware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion software</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese la Descripcion del Software"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fireware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>fireware</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el Fireware" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese Las Observaciones" {...field} />
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
            Crear Datos Complementarios Equipo
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
