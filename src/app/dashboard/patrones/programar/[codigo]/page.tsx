"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

import {
  Form,
  FormControl,
  FormDescription,
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
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useGetAllActivities } from "../../../configuracion/actividad/hook/useActivity";
import { useGetAllFrequencies } from "../../../configuracion/frecuencia/hook/useFrequency";
import { useGetPatternByCode } from "../../hook/usePattern";
import { useCreatePatternSchedule } from "../../hook/usePatternSchedule";
import { ScheduleStatus } from "../../types/patternSchedule.types";

const formSchema = z.object({
  code: z.string(),
  description: z.string(),
  activity: z.string().min(2, { message: "actividad requerida" }),
  frequency: z.string().min(2, { message: "frecuencia requerida" }),
  startDate: z.date({ required_error: "fechaInicio requerida" }),
});
export default function SchedulePattern() {
  const params = useParams<{ codigo: string }>();
  const router = useRouter();

  const { toast } = useToast();
  const { pattern } = useGetPatternByCode(params.codigo);
  const { activities } = useGetAllActivities();
  const { frequencies } = useGetAllFrequencies();
  const { create, isLoading, error, errorMessage } = useCreatePatternSchedule();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (pattern) {
      form.setValue("code", pattern.code);
      form.setValue("description", pattern.description);
    }
  }, [form, pattern]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await create({
      activityId: values.activity,
      scheduledDate: values.startDate.toISOString(),
      frequencyId: values.frequency,
      patternId: pattern?.id!,
      status: ScheduleStatus.PENDIENTE,
    });
    toast({
      title: "Pattern successfully saved",
      variant: "success",
    });
    router.push("/dashboard/patrones/programacion");
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">
        Equipment Scheduling
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input disabled {...field} value={pattern?.code ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={pattern?.description ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actividad</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Actividad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activities.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.description}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Frecuencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencies.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.description}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha inicial</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha de inicio de la programcion del equipo.
                  </FormDescription>
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
            Schedule Pattern
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
