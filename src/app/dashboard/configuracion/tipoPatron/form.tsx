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
import { crearTipoPatron } from "../../hooks/useTipoPatron";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  alias: z.string({ description: "nombre es requerido" }),
  descripcion: z.string({ description: "identificacion es requerido" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PatternTypeFormProps {
  closeModal: () => void;
}

export default function PatternTypeForm({ closeModal }: PatternTypeFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
      descripcion: "",
    },
  });

  const { toast } = useToast();

  const { crear, isLoading, error, errorMsg } = crearTipoPatron();

  async function onSubmit(values: FormValues) {
    await crear({
      alias: values.alias,
      descripcion: values.descripcion,
    });

    form.reset();
    toast({
      title: "Tipo de Patron se guardo correctamente",
      variant: "success",
    });

    closeModal();
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Tipo de Patron</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su Alias" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          <Button type="submit" disabled={isLoading} className="mx-auto">
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!isLoading ? "hidden" : "")
              }
            />
            Crear Tipo Patron
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
