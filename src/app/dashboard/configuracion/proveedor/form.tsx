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
import {
  useCrearProveedor,
  useEditarProveedor,
} from "../../hooks/useProveedor";
import { Identificacion } from "@/app/api/proveedor/dominio/entity";
import { EditarProveedorDTO } from "@/app/api/proveedor/application/dto/editarProveedorDTO";

const formSchema = z.object({
  nombre: z.string(),
  tipoIdetificacion: z.enum(["NIT"]),
  numeroIdentificacion: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  email: z.string().email(),
  nombreContacto: z.string(),
  telefonoContacto: z.string(),
});

interface Props {
  isEditing?: boolean;
  proveedorDto?: EditarProveedorDTO;
  closeModal?: () => void;
}

export function ProveedorForm({
  isEditing = false,
  proveedorDto,
  closeModal,
}: Props) {
  const labelform = isEditing ? "Editar Proveedor" : "Crear Proveedor";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      direccion: proveedorDto?.direccion ?? "",
      email: proveedorDto?.email ?? "",
      nombre: proveedorDto?.nombre ?? "",
      numeroIdentificacion: proveedorDto?.numeroIdentificacion ?? "",
      telefono: proveedorDto?.telefono ?? "",
      tipoIdetificacion:
        (proveedorDto?.tipoIdetificacion as Identificacion) ?? "",
    },
  });

  const { toast } = useToast();
  const {
    crear,
    error,
    errorMsg: errorMsgCreated,
    isLoading: isLoadingCreated,
  } = useCrearProveedor();
  const {
    editar,
    isLoading: isLoadingEdit,
    errorMsg: erroMsgEdit,
  } = useEditarProveedor();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      await editar({
        id: proveedorDto?.id ?? "",
        direccion: values.direccion,
        email: values.email,
        nombre: values.nombre,
        numeroIdentificacion: values.numeroIdentificacion,
        telefono: values.telefono,
        tipoIdetificacion: values.tipoIdetificacion as Identificacion,
        nombreContacto: values.nombreContacto,
        telefonoContacto: values.telefonoContacto,
      });
    } else {
      await crear({
        direccion: values.direccion,
        email: values.email,
        nombre: values.nombre,
        numeroIdentificacion: values.numeroIdentificacion,
        telefono: values.telefono,
        tipoIdetificacion: values.tipoIdetificacion as Identificacion,
        nombreContacto: values.nombreContacto,
        telefonoContacto: values.telefonoContacto,
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
            name="nombre"
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
            name="tipoIdetificacion"
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
            name="numeroIdentificacion"
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
            name="direccion"
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
            name="telefono"
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
            name="nombreContacto"
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
            name="telefonoContacto"
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

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {erroMsgEdit || errorMsgCreated}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
