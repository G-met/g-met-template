"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { obtenerUbicaciones } from "../../hooks/useUbicaciones";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useGetAllBrands } from "../../configuracion/marca/hook/useBrand";
import { useCreateEquipment } from "../hook/useEquipment";
import { validateFileListSize } from "@/app/api/common/files/filesSize";

const formSchema = z.object({
  codigo: z.string().min(2, { message: "codigo requerido" }),
  descripcion: z.string().min(2, { message: "descripcion requerido" }),
  modelo: z.string().min(2, { message: "modelo requerido" }),
  serie: z.string().min(2, { message: "serie requerido" }),
  marcaId: z.string().min(2, { message: "marcaId requerido" }),
  ubicacionId: z.string().min(2, { message: "ubicacionId requerido" }),
  archivos: z
    .any()
    .refine(validateFileListSize, {
      message: "Cada archivo no debe pesar mas de 4.5 MB",
    })
    .optional(),
});

function CrearEquiposBasicos() {
  const { brands } = useGetAllBrands();
  const { ubicaciones } = obtenerUbicaciones();
  const { create, error, errorMessage, isLoading } = useCreateEquipment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      descripcion: "",
      marcaId: "",
      modelo: "",
      serie: "",
      ubicacionId: "",
      archivos: undefined,
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      code: values.codigo,
      description: values.descripcion,
      model: values.modelo,
      serial: values.serie,
      brandId: values.marcaId,
      locationId: values.ubicacionId,
      documents: values.archivos,
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
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese nombre del Codigo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese nombre de la Descripcion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese nombre del Modelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serie</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese nombre de la series"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marcaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un Descripcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.description}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubicacionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Ubicacion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ubicaciones.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.nombre}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="archivos"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Archivos</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg"
                      className="cursor-pointer"
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormDescription>
                    Seleccione uno o más archivos PDF,JPG,PNG
                  </FormDescription>
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
            Crear Equipo
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

export default CrearEquiposBasicos;
