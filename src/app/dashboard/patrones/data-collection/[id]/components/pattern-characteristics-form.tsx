"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  buffers: z.array(
    z.object({
      code: z.string().min(1, "El código es requerido"),
      lote: z.string().min(1, "El lote es requerido"),
      vence: z.string().min(1, "El año de vencimiento es requerido"),
    })
  ),
});

const buffersData = [
  { id: "4", label: "Buffer 4" },
  { id: "7", label: "Buffer 7" },
  { id: "10", label: "Buffer 10" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

export function PatternCharacteristicsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buffers: buffersData.map(() => ({ code: "", lote: "", vence: "" })),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Caracteristicas del Patron</CardTitle>
            <CardDescription>
              Información de los buffers de calibración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Buffer</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Vence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buffersData.map((buffer, index) => (
                  <TableRow key={buffer.id}>
                    <TableCell className="font-medium">
                      <FormLabel>{buffer.label}</FormLabel>
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`buffers.${index}.code`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Código" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`buffers.${index}.lote`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Lote" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`buffers.${index}.vence`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccione el año" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button type="submit">Guardar</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
