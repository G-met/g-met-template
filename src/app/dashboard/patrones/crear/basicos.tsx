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
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { useCreatePattern } from "@/app/dashboard/patrones/hook/usePattern";
import { useGetAllBrands } from "@/app/dashboard/configuracion/marca/hook/useBrand";
import { useGetAllLocations } from "@/app/dashboard/configuracion/ubicacion/hook/useLocation";
import { useGetAllPatternTypes } from "@/app/dashboard/configuracion/tipoPatron/hook/usePatternType";

const formSchema = z.object({
  code: z.string().min(2, { message: "codigo requerido" }),
  description: z.string().min(2, { message: "descripcion requerido" }),
  model: z.string().min(2, { message: "modelo requerido" }),
  serial: z.string().min(2, { message: "serie requerido" }),
  brandId: z.string().min(2, { message: "marcaId requerido" }),
  locationId: z.string().min(2, { message: "ubicacionId requerido" }),
  patternTypeId: z.string().min(2, { message: "tipoPatron requerido" }),
  files: z
    .any()
    .refine(validateFileListSize, {
      message: "Cada archivo no debe pesar mas de 4.5 MB",
    })
    .optional(),
});

export default function CreateBasicPatterns() {
  const { brands } = useGetAllBrands();
  const { locations } = useGetAllLocations();
  const { patternTypes } = useGetAllPatternTypes();
  const { create, error, errorMessage, isLoading } = useCreatePattern();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      description: "",
      model: "",
      serial: "",
      brandId: "",
      locationId: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      code: values.code,
      description: values.description,
      model: values.model,
      serial: values.serial,
      brandId: values.brandId,
      locationId: values.locationId,
      patternTypeId: values.patternTypeId,
      files: values.files,
    });
    form.reset();

    toast({
      title: "Patron se guardo correctamente",
      variant: "success",
    });
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Patron</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese nombre de la Codigo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
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
              name="model"
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
              name="serial"
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
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un Descripcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <>
                          <SelectItem value={brand.id} key={brand.id}>
                            {brand.description}
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
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Ubicacion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <>
                          <SelectItem value={location.id} key={location.id}>
                            {location.name}
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
              name="patternTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Patron</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Tipo Patron" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patternTypes.map((patternType) => (
                        <>
                          <SelectItem
                            value={patternType.id}
                            key={patternType.id}
                          >
                            {patternType.description}
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
              name="files"
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
            Crear Patron
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
