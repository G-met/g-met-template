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
import { EquipmentDetail } from "@/app/dashboard/equipos/types";
import { useState } from "react";
import { useGetAllBrands } from "../../../configuracion/marca/hook/useBrand";
import { useUpdateEquipment } from "@/app/dashboard/equipos/hook/useEquipment";
import { useGetAllLocations } from "../../../configuracion/ubicacion/hook/useLocation";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  code: z.string().min(2, { message: "code required" }),
  description: z.string().min(2, { message: "description required" }),
  model: z.string().min(2, { message: "model required" }),
  serial: z.string().min(2, { message: "serial required" }),
  brandId: z.string().min(2, { message: "brand required" }),
  locationId: z.string().min(2, { message: "location required" }),
});

interface Props {
  equipment: EquipmentDetail;
}

function EditarEquiposBasicos({ equipment }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: equipment.code,
      description: equipment.description,
      model: equipment.model,
      serial: equipment.serial,
      brandId: equipment.brand.id,
      locationId: equipment.location.id,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const { brands } = useGetAllBrands();
  const { locations } = useGetAllLocations();
  const { update, errorMessage, isError, isLoading } = useUpdateEquipment();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      code: equipment.code,
      equipment: {
        description: values.description,
        model: values.model,
        serial: values.serial,
        brandId: values.brandId,
        locationId: values.locationId,
      },
    });
    form.reset();
    toast({
      title: "Equipo se editó correctamente",
      variant: "success",
    });
    router.push("/dashboard/equipos/consultar");
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
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input disabled value={equipment.code} />
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
                  <FormLabel>Descripción</FormLabel>
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
                        <SelectValue placeholder={equipment.brand.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem value={brand.id} key={brand.id}>
                          {brand.description}
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
                  <FormLabel>Ubicación</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={equipment.location.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem value={location.id} key={location.id}>
                          {location.name}
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
                "mr-2 h-4 w-4 animate-spin " + (isLoading ? "" : "hidden")
              }
            />
            Save Changes
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

export default EditarEquiposBasicos;
