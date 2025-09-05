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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProvider, useUpdateProvider } from "./hook/useProvider";
import { UpdateProviderProps } from "./types";

interface Props {
  isEditing?: boolean;
  proveedorDto?: UpdateProviderProps;
  closeModal?: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Nombre de la empresa es requerido"),
  identificationType: z.enum(["NIT"]),
  identificationNumber: z
    .string()
    .min(1, "Número de identificación es requerido"),
  address: z.string(),
  phone: z.string(),
  email: z.string().email("Email inválido"),
  contactName: z.string(),
  contactPhone: z.string(),
});

export function ProveedorForm({
  isEditing = false,
  proveedorDto,
  closeModal,
}: Props) {
  const labelform = isEditing ? "Editar Proveedor" : "Crear Proveedor";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: proveedorDto?.name || "",
      identificationType: (proveedorDto?.identificationType as "NIT") ?? "NIT",
      identificationNumber: proveedorDto?.identificationNumber || "",
      address: proveedorDto?.address || "",
      phone: proveedorDto?.phone || "",
      email: proveedorDto?.email || "",
      contactName: proveedorDto?.contactName || "",
      contactPhone: proveedorDto?.contactPhone || "",
    },
  });

  const { toast } = useToast();
  const {
    create,
    error,
    errorMessage: errorMessageCreated,
    isLoading: isLoadingCreated,
  } = useCreateProvider();
  const {
    update,
    error: updateError,
    errorMessage: errorMessageUpdate,
    isLoading: isLoadingEdit,
  } = useUpdateProvider();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing && proveedorDto) {
      await update({
        id: proveedorDto.id,
        provider: {
          name: values.name,
          identificationType: values.identificationType,
          identificationNumber: values.identificationNumber,
          address: values.address,
          phone: values.phone,
          email: values.email,
          contactName: values.contactName,
          contactPhone: values.contactPhone,
        },
      });
    } else {
      await create({
        name: values.name,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        address: values.address,
        phone: values.phone,
        email: values.email,
        contactName: values.contactName,
        contactPhone: values.contactPhone,
      });
    }

    if (closeModal) {
      closeModal();
    }
    form.reset();
    toast({
      title: "El proveedor se guardo correctamente",
      variant: "success",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la empresa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre de la empresa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Identificacion</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo identificacion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"NIT"} key={"NIT"}>
                      {"NIT"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de Identificacion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la identificacion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la direccion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>telefono</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Ingrese el telefono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese email de la empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de contacto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre de contacto directo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono de contacto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el telefono de contacto directo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoadingEdit || isLoadingCreated}
          className="mx-auto"
        >
          <Loader2
            className={
              "mr-2 h-4 w-4 animate-spin " +
              (isLoadingCreated || isLoadingEdit ? "" : "hidden")
            }
          />
          {labelform}
        </Button>

        {(error || updateError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorMessageUpdate || errorMessageCreated}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
