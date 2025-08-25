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
import { useCreateFrequency } from "./hook/useFrequency";
import { errorMapper } from "./error/errorMapper";

const formSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Descripción es requerida" })
    .max(20, "Máximo 20 caracteres"),
  days: z.string().transform((val) => Number(val)),
});

type FormSchema = z.infer<typeof formSchema>;

interface FrequencyFormProps {
  closeModal: () => void;
}

export default function FrequencyForm({ closeModal }: FrequencyFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      days: 0,
    },
  });

  const { toast } = useToast();

  const { create, isLoading, error, errorMessage } = useCreateFrequency();

  async function onSubmit(values: FormSchema) {
    await create({
      description: values.description,
      daysQuantity: values.days,
    });

    form.reset();
    toast({
      title: "Frecuencia guardada con éxito",
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa una descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de días</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa una cantidad en días"
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
              <AlertDescription>
                {errorMapper[errorMessage] ?? errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
}
