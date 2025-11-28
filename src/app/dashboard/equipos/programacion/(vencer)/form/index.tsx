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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { useGetAllProviders } from "@/app/dashboard/configuracion/proveedor/hook/useProvider";
import { useGetAllUsers } from "@/app/dashboard/configuracion/usuario/hook/useUser";
import { ComboboxForm } from "./Combobox";
import { useState } from "react";
import { Role } from "@/app/api/usuarios/dominio/entity";
import { ExecutorType } from "@/app/api/common/types";
import { disabledDays } from "@/lib/helpers/dates";
import { useCreateEquipmentExecution } from "../../../hook/useEquipmentExecution";

const FormSchema = z.object({
  executionDate: z.date({ required_error: "fechaInicio requerida" }),
  observations: z
    .string()
    .min(10, {
      message: "Observaciones minimo 10 caracteres",
    })
    .max(160, {
      message: "Observaciones maximo 160 caracteres.",
    }),
  files: z
    .any()
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    })
    .optional(),
  executorId: z.string(),
  executorType: z.nativeEnum(ExecutorType),
});

interface Props {
  equipmentScheduleId: string;
  closeModal: () => void;
}

export function FormEjecucionEquipo({
  equipmentScheduleId,
  closeModal,
}: Props) {
  const router = useRouter();
  const { providers } = useGetAllProviders();
  const providerOptions = providers.map((provider) => ({
    value: provider.id,
    label: provider.name,
  }));

  const { users } = useGetAllUsers();
  const userOptions = users
    .filter(
      (user) => user.role === Role.Metrologo || user.role === Role.Auxiliar
    )
    .map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }));
  const { create, error, errorMessage, isLoading } =
    useCreateEquipmentExecution();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await create({
      executorId: data.executorId,
      executionDate: data.executionDate.toISOString(),
      observations: data.observations,
      equipmentScheduleId: equipmentScheduleId,
      files: data.files,
      executorType: data.executorType,
    });
    toast({
      title: "Equipo ejecutado correctamente",
      variant: "success",
    });
    closeModal();
    router.push("/dashboard/equipos/ejecucion");
  }
  const [executorType, setExecutorType] = useState<ExecutorType | "">("");
  const handleExecutorTypeChange = (
    field: (value: ExecutorType) => void,
    value: ExecutorType
  ) => {
    field(value);
    setExecutorType(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="executionDate"
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
          name="executorType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de ejecutor</FormLabel>
              <Select
                onValueChange={(e) =>
                  handleExecutorTypeChange(field.onChange, e as ExecutorType)
                }
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un Tipo de ejecutor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ExecutorType.EXTERNO}>Externo</SelectItem>
                  <SelectItem value={ExecutorType.INTERNO}>Interno</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {executorType === ExecutorType.EXTERNO && (
          <ComboboxForm
            form={form}
            listValues={providerOptions}
            label="Proveedores"
            name="executorId"
            placeholder="Seleccione un proveedor"
          />
        )}
        {executorType === ExecutorType.INTERNO && (
          <ComboboxForm
            form={form}
            listValues={userOptions}
            label="Usuarios"
            name="executorId"
            placeholder="Seleccione un usuario"
          />
        )}
        <FormField
          control={form.control}
          name="observations"
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
          name="files"
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
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
