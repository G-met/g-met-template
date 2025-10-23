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
import { crearDatosComplementarios } from "../../hooks/usePatron";
import { cumple } from "@/src/app/api/equipos/dominio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z
  .object({
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
  })
function CrearDatosmetrologicos() {
  const { crear, error, errorMsg, isLoading } = crearDatosComplementarios();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      cumpleEspecificacionInstalaciones: cumple.NO,
      descripcionEspecificaciones: "",
      descripcionSoftware: "",
      fireware: "",
      observaciones: "",
      utilizaSoftware: cumple.NO,
      versionSoftware: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    await crear({
      ...values,
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
                  <FormLabel>Codigo Patron</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese codigo del patron" {...field} />
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
                    <Input
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                    <Input placeholder="Ingrese Rango Maximo" {...field} />
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
                    <Input placeholder="Ingrese Rango Minimo" {...field} />
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
                    <Input placeholder="Ingrese Resolucion" {...field} />
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
            Crear datos complementarios
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

export default CrearDatosmetrologicos;
