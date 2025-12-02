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
import { useUpdateComplementaryDataEquipment } from "../../hook/useEquipment";
import { Cumple } from "@/app/dashboard/common/types";
import { EquipmentDetail } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  code: z.string({ description: "codigo requerido" }),
  specificationsDescription: z
    .string({
      description: "descripcionEspecificaciones requerido",
    })
    .optional(),
  meetsInstallationSpecifications: z.nativeEnum(Cumple),
  usesSoftware: z.nativeEnum(Cumple),
  softwareDescription: z.string().optional(),
  softwareVersion: z
    .string({ description: "versionSoftware requerido" })
    .optional(),
  firmware: z.string({ description: "fireware requerido" }).optional(),
  observations: z.string({ description: "observaciones requerido" }).optional(),
});

interface Props {
  equipment: EquipmentDetail;
}
function EditarDatosComplementarios({ equipment }: Props) {
  const { update, errorMessage, error, isLoading } =
    useUpdateComplementaryDataEquipment();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: equipment.code,
      meetsInstallationSpecifications: equipment.complementaryData
        ?.meetsInstallationSpecifications
        ? Cumple.SI
        : Cumple.NO,
      specificationsDescription:
        equipment.complementaryData?.specificationsDescription ?? "",
      softwareDescription:
        equipment.complementaryData?.softwareDescription ?? "",
      firmware: equipment.complementaryData?.firmware ?? "",
      observations: equipment.complementaryData?.observations ?? "",
      usesSoftware: equipment.complementaryData?.usesSoftware
        ? Cumple.SI
        : Cumple.NO,
      softwareVersion: equipment.complementaryData?.softwareVersion ?? "",
    },
  });

  const { toast } = useToast();
  const [isDisabled, setIsDisabled] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      equipmentCode: values.code,
      data: {
        specificationsDescription: values.specificationsDescription || "",
        meetsInstallationSpecifications:
          values.meetsInstallationSpecifications === Cumple.SI,
        usesSoftware: values.usesSoftware === Cumple.SI,
        softwareDescription: values.softwareDescription || null,
        softwareVersion: values.softwareVersion || null,
        firmware: values.firmware || null,
        observations: values.observations || null,
      },
    });
    toast({
      title: "Dato complementarios se editaron correctamente",
      variant: "success",
    });
    router.push("/dashboard/equipos/consultar");
  }
  if (!equipment.complementaryData) {
    return <p>El equipo no tiene datos complementarios</p>;
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
              name="specificationsDescription"
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
              name="softwareVersion"
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
              name="meetsInstallationSpecifications"
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
              name="usesSoftware"
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
              name="softwareDescription"
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
              name="firmware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmware</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observations"
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
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}

export default EditarDatosComplementarios;
