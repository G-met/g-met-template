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
import { crearUbicacion } from "../../hooks/useUbicaciones";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useGetAllResponsible } from "../responsable/hook/useResponsible";

const formSchema = z.object({
  nombre: z.string().min(2, { message: "requerido" }),
  responsable: z
    .string({ required_error: "Seleccione un responsable" })
    .min(2, { message: "requerido" }),
});

export type FormValues = z.infer<typeof formSchema>;

interface UbicacionFormProps {
  closeModal: () => void;
}

export default function UbicacionForm({ closeModal }: UbicacionFormProps) {
  const { responsables } = useGetAllResponsible();
  const { crear, error, errorMsg, isLoading } = crearUbicacion();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      responsable: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: FormValues) {
    await crear({
      nombre: values.nombre,
      responsable_id: values.responsable,
    });
    form.reset();
    toast({
      title: "Ubicacion se guardo correctamente",
      variant: "success",
    });
    closeModal();
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Ubicaciones</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese nombre de la ubicacion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un responsable" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {responsables.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {`${res.name} ${res.lastName}`}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
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
            Crear Ubicacion
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}
