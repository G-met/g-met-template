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
import { crearFrecuencia } from "../../hooks/useFrecuencia";

const formSchema = z.object({
  descripcion: z
    .string()
    .min(2, { message: "requerido" })
    .max(20, "los caracteres maximos son 20"),
  cantidadDias: z.string().transform((val) => Number(val)),
});

type FormSchema = z.infer<typeof formSchema>;

interface FrecuenciaFormProps {
  closeModal: () => void;
}

export default function FrecuenciaForm({ closeModal }: FrecuenciaFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: "",
      cantidadDias: 0,
    },
  });

  const { toast } = useToast();

  const { crear, isLoading, error, errorMsg } = crearFrecuencia();

  async function onSubmit(values: FormSchema) {
    await crear({
      descripcion: values.descripcion,
      cantidadDias: values.cantidadDias,
    });

    form.reset();
    toast({
      title: "Frecuencia se guardo correctamente",
      variant: "success",
    });
    closeModal();
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Frecuencia</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese una descripcion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidadDias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad Dias</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese una cantidad en dias"
                      {...field}
                      type="number"
                    />
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
            Crear Frecuencia
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
