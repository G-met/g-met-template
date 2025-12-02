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
import { useCreateComplementaryDataPattern } from "../hook/usePattern";
import { Cumple } from "@/app/dashboard/common/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  code: z.string({ description: "code required" }),
  specificationsDescription: z
    .string({
      description: "specificationsDescription required",
    })
    .optional(),
  meetsInstallationSpecifications: z.nativeEnum(Cumple),
  usesSoftware: z.nativeEnum(Cumple),
  softwareDescription: z.string().optional(),
  softwareVersion: z
    .string({ description: "softwareVersion required" })
    .optional(),
  firmware: z.string({ description: "firmware required" }).optional(),
  observations: z
    .string({ description: "observations required" })
    .optional(),
});
function CreateComplementaryData() {
  const { create, error, errorMessage, isLoading } =
    useCreateComplementaryDataPattern();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      meetsInstallationSpecifications: Cumple.NO,
      specificationsDescription: "",
      softwareDescription: "",
      firmware: "",
      observations: "",
      usesSoftware: Cumple.NO,
      softwareVersion: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      patternId: values.code,
      specificationsDescription: values.specificationsDescription ?? "",
      meetsInstallationSpecifications: values.meetsInstallationSpecifications === Cumple.SI,
      usesSoftware: values.usesSoftware === Cumple.SI,
      softwareDescription: values.softwareDescription,
      softwareVersion: values.softwareVersion,
      firmware: values.firmware,
      observations: values.observations,
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
              name="code"
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
              name="specificationsDescription"
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
              name="softwareVersion"
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
              name="meetsInstallationSpecifications"
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
              name="usesSoftware"
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
              name="softwareDescription"
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
              name="firmware"
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
              name="observations"
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
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}

export default CreateComplementaryData;
