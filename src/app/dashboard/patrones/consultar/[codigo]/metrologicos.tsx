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
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useUpdateMetrologicalDataPattern } from "../../hook/usePattern";
import { PatternDetail } from "@/app/dashboard/patrones/types";
const formSchema = z.object({
  code: z.string({ description: "code required" }),
  emp: z.coerce
    .string({ description: "emp required" })
    .transform((val) => Number(val)),
  scaleDivision: z.coerce
    .string({ description: "scale division required" })
    .transform((val) => Number(val)),
  resolution: z.coerce
    .string({ description: "resolution required" })
    .transform((val) => Number(val)),
  minimumRange: z.coerce
    .string({ description: "minimum range required" })
    .transform((val) => Number(val)),
  maximumRange: z.coerce
    .string({ description: "maximum range required" })
    .transform((val) => Number(val)),
});
interface Props {
  patron: PatternDetail;
}
function EditarDatosmetrologicos({ patron }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const { update, error, errorMessage, isLoading } = useUpdateMetrologicalDataPattern();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: patron.code,
      scaleDivision: patron.metrologicalData?.scaleDivision,
      emp: patron.metrologicalData?.emp,
      maximumRange: patron.metrologicalData?.maximumRange,
      minimumRange: patron.metrologicalData?.minimumRange,
      resolution: patron.metrologicalData?.resolution,
    },
  });
  useEffect(() => {}, []);

  if (patron.metrologicalData === null) {
    return <p>El equipo no tiene datos metrologicos</p>;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await update({
      patternCode: patron.code,
      data: {
        emp: values.emp,
        scaleDivision: values.scaleDivision,
        resolution: values.resolution,
        minimumRange: values.minimumRange,
        maximumRange: values.maximumRange,
      }
    });

    form.reset();
    toast({
      title: "Patron se edito correctamente",
      variant: "success",
    });
    router.push("/dashboard/patrones/consultar");
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Equipo</FormLabel>
                  <FormControl>
                    <Input {...field} value={patron?.code} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scaleDivision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division de escala</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emp</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maximumRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Maximo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minimumRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Minimo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolucion</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            style={{ display: !isDisabled ? "none" : "block" }}
            onClick={() => setIsDisabled(false)}
            className="mx-auto"
          >
            Editar Patron
          </Button>

          <Button
            type="submit"
            disabled={false}
            className="mx-auto"
            style={{ display: isDisabled ? "none" : "block" }}
          >
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!false ? "hidden" : "")
              }
            />
            Guardar Cambios
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

export default EditarDatosmetrologicos;
