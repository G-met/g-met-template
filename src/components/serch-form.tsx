import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { queryValuesDTO } from "@/app/dashboard/common/types";
import { ReactNode } from "react";

const formSchema = z.object({
  termino: z.string().min(3, { message: "requerido" }),
  valor: z
    .string({ required_error: "requerido" })
    .min(3, { message: "requerido" }),
});

interface Props {
  buscarPorTermino: (args?: queryValuesDTO | undefined) => Promise<void>;
  renderSelectOptions: () => ReactNode;
}

export default function SearchForm({
  buscarPorTermino,
  renderSelectOptions,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termino: "",
      valor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await buscarPorTermino({
      termino: values.termino,
      valor: values.valor,
      page: 1,
      limit: 5,
    });
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-10 md:grid-cols-6 grid-rows-1 gap-2 mb-2"
        >
          <FormField
            control={form.control}
            name="termino"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Buscar por" />
                    </SelectTrigger>
                  </FormControl>
                  {renderSelectOptions()}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input placeholder="Ingrese el valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="col-span-1">
            Buscar
          </Button>
        </form>
      </Form>
    </>
  );
}
