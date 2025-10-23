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
import { useUpdateComplementaryDataPattern } from "@/app/dashboard/patrones/hook/usePattern";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PatternDetail } from "@/app/dashboard/patrones/types";
import { cumple } from "@/app/api/patrones/dominio";
const formSchema = z.object({
  code: z.string({ description: "code required" }),
  specificationsDescription: z
    .string({
      description: "specifications description required",
    })
    .optional(),
  meetsInstallationSpecifications: z.nativeEnum(cumple),
  usesSoftware: z.nativeEnum(cumple),
  softwareDescription: z.string().optional(),
  softwareVersion: z
    .string({ description: "software version required" })
    .optional(),
  firmware: z.string({ description: "firmware required" }).optional(),
  observations: z
    .string({ description: "observations required" })
    .optional(),
});

interface Props {
  patron: PatternDetail;
}
function EditarDatosComplementarios({ patron }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const { update, error, errorMessage, isError, isLoading } = useUpdateComplementaryDataPattern();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: patron.code,
      meetsInstallationSpecifications:
        patron.complementaryData?.meetsInstallationSpecifications ? cumple.SI : cumple.NO,
      specificationsDescription:
        patron.complementaryData?.specificationsDescription ?? "",
      softwareDescription:
        patron.complementaryData?.softwareDescription ?? "",
      firmware: patron.complementaryData?.firmware ?? "",
      observations: patron.complementaryData?.observations ?? "",
      usesSoftware: patron.complementaryData?.usesSoftware ? cumple.SI : cumple.NO,
      softwareVersion: patron.complementaryData?.softwareVersion ?? "",
    },
  });

  const { toast } = useToast();
  console.log(patron.complementaryData)
  if (
    !patron.complementaryData ||
    (patron.complementaryData &&
      Object.values(patron.complementaryData).length === 0)
  ) {
    return <p>El patron no tiene datos complementarios</p>;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      patternCode: patron.code,
      data: {
        specificationsDescription: values.specificationsDescription || undefined,
        meetsInstallationSpecifications: values.meetsInstallationSpecifications === cumple.SI,
        usesSoftware: values.usesSoftware === cumple.SI,
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
    router.push("/dashboard/patrones/consultar");
  }
  if (patron.complementaryData === null) {
    return <p>El patron no tiene datos compllemetarios</p>;
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
                    <Input {...field} value={patron?.code} disabled />
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
                  <FormLabel>firmware</FormLabel>
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

          {isError && (
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
