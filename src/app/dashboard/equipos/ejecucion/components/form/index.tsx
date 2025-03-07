'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAgregarArchivosEjecucion } from "@/app/dashboard/hooks/useEjecucionEquipo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { toast } from "@/components/ui/use-toast";
const FormSchema = z.object({
  archivos: z
    .any()
    .refine((value) => value.length > 0, {
      message: "Debe enviar al menos un archivo",
    })
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    }),
});
type FormValues = z.infer<typeof FormSchema>;
interface Props {
  ejecucionEquipoId: string;
  closeModal: () => void;
}

export function FormEjecucionEquipo({ ejecucionEquipoId, closeModal }: Props) {
  const { subir, error, errorMsg, isLoading } = useAgregarArchivosEjecucion();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      archivos: [],
    },
  });

  async function onSubmit(data: FormValues) {
    await subir({
      archivos: data.archivos,
      ejecucionId: ejecucionEquipoId,
    });
    toast({
      title: "Los archivos se han subido correctamente",
      variant: "success",
    });
    closeModal();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="archivos"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Archivos</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf"
                  className="cursor-pointer"
                  onChange={(event) => {
                    onChange(event.target.files);
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Seleccione uno o más archivos PDF
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ejecutar
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
