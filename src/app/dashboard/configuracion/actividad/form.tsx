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
import { useCreateActivity } from "./hook/useActivity";

const formSchema = z.object({
  description: z
    .string()
    .min(2, { message: "requerido" })
    .max(20, "los caracteres maximos son 20"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  closeModal?: () => void;
}

export default function ActivityForm({ closeModal }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const { toast } = useToast();

  const { create, isLoading, error, errorMessage } = useCreateActivity();

  async function onSubmit(values: FormValues) {
    await create({
      description: values.description.toLowerCase(),
    });

    form.reset();
    toast({
      title: "Actividad creada con éxito",
      variant: "success",
    });
    closeModal?.();
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Actividad</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese la descripción de la actividad"
                      {...field}
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
            Crear Actividad
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
