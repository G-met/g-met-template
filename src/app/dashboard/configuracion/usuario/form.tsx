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
import { useEditarProveedor } from "../../hooks/useProveedor";
import { Role } from "@/app/api/usuarios/dominio/entity";
import { useCrearUsuario } from "../../hooks/useUsuario";
import { crearUsuarioDTOschema } from "@/app/api/usuarios/use-cases/dto/crearUsuario.DTO";

interface Props {
  isEditing?: boolean;
  //proveedorDto?: EditarProveedorDTO;
  closeModal?: () => void;
}

type FormValues = z.infer<typeof crearUsuarioDTOschema>;

export function UsuarioForm({
  isEditing = false,
  //proveedorDto,
  closeModal,
}: Props) {
  const isValidRole = true

  const labelform = isEditing ? "Editar Usuario" : "Crear Usuario";
  const form = useForm<FormValues>({
    resolver: zodResolver(crearUsuarioDTOschema),
    defaultValues: {},
  });

  const { toast } = useToast();
  const {
    crear,
    error,
    errorMsg: errorMsgCreated,
    isLoading: isLoadingCreated,
  } = useCrearUsuario();
  const {
    editar,
    isLoading: isLoadingEdit,
    errorMsg: erroMsgEdit,
  } = useEditarProveedor();
  async function onSubmit(values: FormValues) {
    if (isEditing) {
      // await editar({
      //   id: proveedorDto?.id ?? "",
      //   direccion: values.direccion,
      //   email: values.email,
      //   nombre: values.nombre,
      //   numeroIdentificacion: values.numeroIdentificacion,
      //   telefono: values.telefono,
      //   tipoIdetificacion: values.tipoIdetificacion as Identificacion,
      // });
    } else {
      console.log(form.formState);
      console.log(form.setError);
      await crear({
        usuario: values.usuario,
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        cargo: values.cargo,
        rol: values.rol as Role,
      });
    }

    if (closeModal) {
      closeModal();
    }
    form.reset();
    toast({
      title: "El usuario se guardo correctamente",
      variant: "success",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          <FormField
            control={form.control}
            name="usuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese un nombre de usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre del usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el apellido del usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el correo del usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el cargo del usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol del usuario</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Role.Metrologo} key={Role.Metrologo}>
                      {Role.Metrologo}
                    </SelectItem>

                    <SelectItem value={Role.Auxiliar} key={Role.Auxiliar}>
                      {Role.Auxiliar}
                    </SelectItem>

                    <SelectItem value={Role.Consulta} key={Role.Consulta}>
                      {Role.Consulta}
                    </SelectItem>

                    <SelectItem value={Role.Cordinador} key={Role.Cordinador}>
                      {Role.Cordinador}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={!isValidRole || isLoadingEdit || isLoadingCreated}
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
