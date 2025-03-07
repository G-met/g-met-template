"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCrearEjecucionPatron } from "@/app/dashboard/hooks/useEjecucionPatron";
import { useRouter } from "next/navigation";
import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { Input } from "@/components/ui/input";
import { TipoEjecutor } from "@/app/api/common/types";
import { ComboboxForm } from "./Combobox";
import { useState } from "react";
import { useListadoProvedores } from "@/app/dashboard/hooks/useProveedor";
import { useListadoUsuarios } from "@/app/dashboard/hooks/useUsuario";
import { Role } from "@/app/api/usuarios/dominio/entity";
import { disabledDays } from "@/lib/helpers/dates";

const FormSchema = z.object({
  fechaEjecucion: z.date({ required_error: "fechaInicio requerida" }),
  observaciones: z
    .string()
    .min(10, {
      message: "observaciones must be at least 10 characters.",
    })
    .max(160, {
      message: "observaciones must not be longer than 30 characters.",
    }),
  archivos: z
    .any()
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    })
    .optional(),
  ejecutorId: z.string(),
  tipoEjecutor: z.nativeEnum(TipoEjecutor),
});
interface Props {
  programacionPatronId: string;
  closeModal: () => void;
}

export function FormEjecucionPatron({
  programacionPatronId,
  closeModal,
}: Props) {
  const router = useRouter();
  const { proveedores } = useListadoProvedores();
  const listValuesProveedores = proveedores.map((proveedor) => ({
    value: proveedor.id,
    label: proveedor.nombre,
  }));

  const { usuarios } = useListadoUsuarios({
    roles: [Role.Metrologo, Role.Auxiliar],
  });
  const listValuesUsuarios = usuarios.map((usuario) => ({
    value: usuario.id,
    label: usuario.nombre,
  }));
  const { crear, error, errorMsg, isLoading } = useCrearEjecucionPatron();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  console.log(form.formState.errors);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await crear({
      ejecutorId: data.ejecutorId,
      fechaEjecucion: data.fechaEjecucion.toISOString(),
      observaciones: data.observaciones,
      programacionPatronId: programacionPatronId,
      archivos: data.archivos,
      tipoEjecutor: data.tipoEjecutor,
    });
    toast({
      title: "Patron ejecutado corrrectamente",
      variant: "success",
    });
    closeModal();
    router.push("/dashboard/patrones/ejecucion");
  }
  const [tipoProvider, setTipoProvider] = useState("");
  const tipoProveedor = (field: (...event: any[]) => void, e: string) => {
    field(e);
    setTipoProvider(e);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fechaEjecucion"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha Ejecucion</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Escoja una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={disabledDays}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Ingrese la fecha de ejecucion de la programacion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoEjecutor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de ejecutor</FormLabel>
              <Select
                onValueChange={(e) => tipoProveedor(field.onChange, e)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un Tipo de ejecutor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TipoEjecutor.EXTERNO}>Externo</SelectItem>
                  <SelectItem value={TipoEjecutor.INTERNO}>Interno</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {tipoProvider === TipoEjecutor.EXTERNO && (
          <ComboboxForm
            form={form}
            listValues={listValuesProveedores}
            label="Proveedores"
            name="ejecutorId"
            placeholder="Seleccione un proveedor"
          />
        )}
        {tipoProvider === TipoEjecutor.INTERNO && (
          <ComboboxForm
            form={form}
            listValues={listValuesUsuarios}
            label="Usuarios"
            name="ejecutorId"
            placeholder="Seleccione un usuario"
          />
        )}
        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observaciones"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
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
                  accept=".pdf,application/pdf"
                  className="cursor-pointer"
                  onChange={(event) => {
                    onChange(event.target.files);
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Seleccione uno o más archivos PDF
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ejecutar
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
