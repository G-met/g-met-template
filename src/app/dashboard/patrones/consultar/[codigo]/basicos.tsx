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
import {  useState } from "react";
import { useGetAllBrands } from "../../../configuracion/marca/hook/useBrand";

import { useGetAllLocations } from "../../../configuracion/ubicacion/hook/useLocation";

import { useRouter } from "next/navigation";
import { PatternDetail } from "@/app/dashboard/patrones/types";
import { useUpdatePattern } from "@/app/dashboard/patrones/hook/usePattern";
const formSchema = z.object({
  code: z.string().min(2, { message: "codigo requerido" }),
  description: z.string().min(2, { message: "descripcion requerido" }),
  model: z.string().min(2, { message: "modelo requerido" }),
  serial: z.string().min(2, { message: "serie requerido" }),
  brandId: z.string().min(2, { message: "marca requerido" }),
  locationId: z.string().min(2, { message: "ubicacionId requerido" }),
});

interface Props {
  pattern: PatternDetail;
}

function EditarPatronesBasicos({ pattern }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: pattern.code,
      description: pattern.description,
      model: pattern.model,
      serial: pattern.serial,
      brandId: pattern.brand.id,
      locationId: pattern.location.id,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const { brands } = useGetAllBrands();
  const { locations } = useGetAllLocations();
  const { update, errorMessage, isError, isLoading } = useUpdatePattern();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      code: pattern.code,
      pattern: {
        description: values.description,
        model: values.model,
        serial: values.serial,
        brandId: values.brandId,
        locationId: values.locationId,
      },
    });
    toast({
      title: "patron se edito correctamente",
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input disabled value={pattern.code} />
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
                    <Input disabled={isDisabled} {...field} />
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
                    <Input disabled={isDisabled} {...field} />
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
                    <Input {...field} disabled={isDisabled} />
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
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={pattern.brand.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((res) => (
                        <SelectItem value={res.id} key={res.id}>
                          {res.description}
                        </SelectItem>
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
                    disabled={isDisabled}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={pattern.location.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((res) => (
                        <SelectItem value={res.id} key={res.id}>
                          {res.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            Editar Patron
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="mx-auto"
            style={{ display: isDisabled ? "none" : "block" }}
          >
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (isLoading ? "" : "hidden")
              }
            />
            Guardar Cambios
          </Button>

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage ?? ""}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}

export default EditarPatronesBasicos;
