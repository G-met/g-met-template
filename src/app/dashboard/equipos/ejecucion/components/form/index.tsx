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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { validateFileListSize } from "@/app/dashboard/common/files/filesSize";
import { toast } from "@/components/ui/use-toast";
import { useUploadFilesToEquipmentExecution } from "../../../hook/useEquipmentExecution";
const FormSchema = z.object({
  files: z
    .any()
    .refine((value) => value.length > 0, {
      message: "Debe enviar al menos un archivo",
    })
    .refine(validateFileListSize, {
      message: "Los archivos no deben pesar más de 4 MB",
    }),
});
type FormValues = z.infer<typeof FormSchema>;
interface Props {
  equipmentExecutionId: string;
  closeModal: () => void;
}

export function FormEjecucionEquipo({ equipmentExecutionId, closeModal }: Props) {
  const { uploadFiles, errorMessage, isLoading, isError } = useUploadFilesToEquipmentExecution();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      files: [],
    },
  });

  async function onSubmit(data: FormValues) {
    await uploadFiles({
      files: Array.from(data.files),
      code: equipmentExecutionId,
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
          name="files"
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
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
