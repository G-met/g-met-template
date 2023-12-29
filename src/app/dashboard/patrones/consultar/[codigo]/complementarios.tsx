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
import { editarDatosComplementarios } from "@/app/dashboard/hooks/usePatron";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Patron, cumple } from "@/app/api/patrones/dominio";
const formSchema = z.object({
  codigo: z.string({ description: "codigo requerido" }),
  descripcionEspecificaciones: z
    .string({
      description: "descripcionEspecificaciones requerido",
    })
    .optional(),
  cumpleEspecificacionInstalaciones: z.nativeEnum(cumple),
  utilizaSoftware: z.nativeEnum(cumple),
  descripcionSoftware: z.string().optional(),
  versionSoftware: z
    .string({ description: "versionSoftware requerido" })
    .optional(),
  fireware: z.string({ description: "fireware requerido" }).optional(),
  observaciones: z
    .string({ description: "observaciones requerido" })
    .optional(),
});

interface Props {
  patron: Patron;
}
function EditarDatosComplementarios({ patron }: Props) {
  if (
    patron.datos_complementarios === null ||
    (patron.datos_complementarios &&
      Object.values(patron.datos_complementarios).length === 0)
  ) {
    return <p>El patron no tiene datos compllemetarios</p>;
  }
  const { editar, errorMsg, error, isLoading } = editarDatosComplementarios();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: patron.codigo,
      cumpleEspecificacionInstalaciones:
        patron.datos_complementarios?.cumple_especificacion_instalaciones,
      descripcionEspecificaciones:
        patron.datos_complementarios?.descripcion_especificaciones ?? "",
      descripcionSoftware:
        patron.datos_complementarios?.descripcion_software ?? "",
      fireware: patron.datos_complementarios?.fireware ?? "",
      observaciones: patron.datos_complementarios?.observaciones ?? "",
      utilizaSoftware: patron.datos_complementarios?.utiliza_software,
      versionSoftware: patron.datos_complementarios?.version_software ?? "",
    },
  });

  const { toast } = useToast();
  const [isDisabled, setIsDisabled] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    await editar({
      codigo: values.codigo,
      utilizaSoftware: values.utilizaSoftware,
      cumpleEspecificacionInstalaciones:
        values.cumpleEspecificacionInstalaciones,
      descripcionEspecificaciones: values.descripcionEspecificaciones,
      descripcionSoftware: values.descripcionSoftware,
      fireware: values.fireware,
      observaciones: values.observaciones,
      versionSoftware: values.versionSoftware,
    });
    toast({
      title: "Dato complementarios se editaron correctamente",
      variant: "success",
    });
    router.push("/dashboard/patrones/consultar");
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
                    <Input {...field} value={patron?.codigo} disabled />
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
                    <Input {...field} disabled={isDisabled} />
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
                    <Input {...field} disabled={isDisabled} />
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={cumple.NO}>No</SelectItem>
                      <SelectItem value={cumple.SI}>Si</SelectItem>
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="elija una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={cumple.NO}>No</SelectItem>
                      <SelectItem value={cumple.SI}>Si</SelectItem>
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
                      disabled={isDisabled}
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
                    <Input disabled={isDisabled} {...field} />
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
                    <Input disabled={isDisabled} {...field} />
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
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}

export default EditarDatosComplementarios;
