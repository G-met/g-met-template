"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const getSubdomain = () => {
  // Asegúrate de estar en el lado del cliente antes de acceder a window
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return hostname.split(".")[0];
  }
  return null;
};

const formSchema = z.object({
  correo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  contraseña: z.string(),
});

export default function ProfileForm() {
  // ...ç
  // 1. Define your form.
  const router = useRouter();
  console.log();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contraseña: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await signIn("credentials", {
      correo: values.correo,
      contraseña: values.contraseña,
      cliente: getSubdomain(),
      redirect: false,
    });

    console.log(res);
    if (res?.error) return;
    router.push("/dashboard");
  }

  return (
    <>
      <div className=" flex container relative h-[729px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
          <Image
            src="/banner-login.jpg"
            alt="me"
            width={1280}
            height={843}
          />
        </div>
        <div className="w-full p-4 md:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Image
              src="/logo.jpg"
              alt="me"
              width={150}
              height={50}
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input placeholder="correo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contraseña"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Ingresar</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
