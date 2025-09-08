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
import { useCreateBrand, useUpdateBrand } from "./hook/useBrand";
import { BrandResponse } from "./types";
import { errorMapper } from "./error/errorMapper";

const formSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Descripción es requerida" })
    .max(20, "Máximo 20 caracteres"),
  identification: z.string().min(2, { message: "Identificación es requerida" }),
});

interface Props {
  isEditing?: boolean;
  brand?: BrandResponse;
  closeModal?: () => void;
}

export function BrandForm({ isEditing = false, brand, closeModal }: Props) {
  const labelform = isEditing ? "Editar Marca" : "Crear Marca";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: brand?.identification ?? "",
      description: brand?.description ?? "",
    },
  });

  const { toast } = useToast();
  const { create, error, errorMessage, isLoading: isLoadingCreated } = useCreateBrand();
  const { update, isLoading: isLoadingEdit } = useUpdateBrand();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      await update({
        identification: values.identification,
        description: values.description,
        id: brand?.id!,
      });
    } else {
      await create({
        identification: values.identification,
        description: values.description,
      });
    }

    if (closeModal) {
      closeModal();
    }
    form.reset();
    toast({
      title: "Marca guardada correctamente",
      variant: "success",
    });
  }

  return (
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
                  <Input placeholder="Ingrese una descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identificación</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un alias" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoadingEdit || isLoadingCreated} className="mx-auto">
          <Loader2
            className={
              "mr-2 h-4 w-4 animate-spin " + ((isLoadingCreated || isLoadingEdit) ? "" : "hidden")
            }
          />
          {labelform}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMapper[errorMessage] ?? errorMessage}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
