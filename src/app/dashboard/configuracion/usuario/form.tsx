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
import { crearUsuarioDTOschema } from "@/app/api/usuarios/use-cases/dto/crearUsuario.DTO";
import { useCreateUser } from "./hook/useUser";

interface Props {
  isEditing?: boolean;
  //proveedorDto?: EditarProveedorDTO;
  closeModal?: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  position: z.string().min(1, "El puesto es requerido"),
  role: z.string().min(1, "El rol es requerido"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .min(1, "El correo electrónico es requerido"),
  idCode: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function UsuarioForm({
  isEditing = false,
  //proveedorDto,
  closeModal,
}: Props) {
  const isValidRole = true;

  const labelform = isEditing ? "Editar Usuario" : "Crear Usuario";
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { toast } = useToast();
  const { isError, isLoading, createUser, error, errorMessage } =
    useCreateUser();
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
      await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        position: values.position,
        role: values.role as Role,
        idCode: values.idCode, // Assuming 'nombre' is used as idCode, adjust as necessary
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
            name="idCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo Identificacion</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el codigo de identificacion"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
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
            name="lastName"
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
            name="email"
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
            name="position"
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
            name="role"
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
          disabled={!isValidRole || isLoadingEdit || isLoading}
          className="mx-auto"
        >
          <Loader2
            className={
              "mr-2 h-4 w-4 animate-spin " +
              (isLoading || isLoadingEdit ? "" : "hidden")
            }
          />
          {labelform}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{erroMsgEdit || errorMessage}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
