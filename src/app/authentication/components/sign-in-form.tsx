"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            if (ctx.error.code === "USER_NOT_FOUND") {
              toast.error("E-mail não encontrado.");
              form.setError("email", {
                message: "E-mail não encontrado.",
              });
              return;
            }
            if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              toast.error("E-mail ou senha inválidos.");
              form.setError("password", {
                message: "E-mail ou senha inválidos.",
              });
              form.setError("email", {
                message: "E-mail ou senha inválidos.",
              });
              return;
            }
            toast.error(ctx.error.message);
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-light">
        {/* Campos de email e senha (igual ao seu código) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="w-full  py-5 bg-white border border-pink-200/60 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
                  placeholder="Digite seu email"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <div className="relative flex items-center">
                <FormControl className="flex-grow">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="w-full pr-10 py-5 bg-white/60 border border-pink-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
                    placeholder="Digite sua senha"
                    {...field}
                    required
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-600 hover:text-rose-500 transition"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-rose-400  text-white py-3 px-4 rounded-2xl font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-pink-200/40 hover:shadow-xl hover:shadow-pink-300/50 flex items-center justify-center gap-2 group mt-5 ${
            isLoading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <>
              Entrar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
