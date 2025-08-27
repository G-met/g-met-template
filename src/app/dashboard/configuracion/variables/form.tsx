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
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useCreateVariable } from "./hook/useVariable";
import { useGetAllMagnitudes } from "../magnitud/hook/useMagnitud";
import { error } from "console";

const formSchema = z.object({
  alias: z.string().min(1, { message: "requerido" }),
  description: z
    .string({ required_error: "Seleccione un responsable" })
    .min(1, { message: "requerido" }),
  magnitudeId: z.string({
    required_error: "Seleccione una magnitud.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface VariableFormProps {
  closeModal: () => void;
}

export default function VariableForm({ closeModal }: VariableFormProps) {
  const { magnitudes } = useGetAllMagnitudes();
  const { create, errorMessage, isError, isLoading } = useCreateVariable();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
      description: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: FormSchema) {
    await create({
      alias: values.alias,
      description: values.description,
      magnitudeId: values.magnitudeId,
    });
    form.reset();
    toast({
      title: "La variable se guardo correctamente",
      variant: "success",
    });
    closeModal();
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Variables</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="description"
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
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>alias</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese un alias" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='magnitudeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Magnitud</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Magnitud" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {magnitudes.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.name}
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
            Crear Variable
          </Button>

          {isError && (
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
