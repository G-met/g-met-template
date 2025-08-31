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
import { useCreateResponsible } from "./hook/useResponsible";
import { errorMapper } from "./error/errorMapper";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "requerido" })
    .max(20, "los caracteres maximos son 20"),
  identification: z.string().min(2, { message: "requerido" }),
  lastName: z.string().min(2, { message: "requerido" }),
});

export type FormValues = z.infer<typeof formSchema>;

interface ResponsibleFormProps {
  closeModal: () => void;
}

export default function ResponsibleForm({ closeModal }: ResponsibleFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      identification: "",
    },
  });
  const { toast } = useToast();
  const { create, isLoading, error, errorMessage } = useCreateResponsible();

  async function onSubmit(values: FormValues) {
    await create({
      name: values.name,
      identification: values.identification,
      lastName: values.lastName,
    });
    form.reset();
    toast({
      title: "Responsable se guardo correctamente",
      variant: "success",
    });
    closeModal();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
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
                  <Input placeholder="Ingrese su Apellido" {...field} />
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
                <FormLabel>Identificacion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su Identificaciòn" {...field} />
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
          Crear Responsable
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
  );
}
