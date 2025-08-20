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

const formSchema = z
  .object({
    name: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            if (error.error.code === "USER_ALREADY_EXISTS") {
              toast.error("E-mail já cadastrado.");
              form.setError("email", {
                message: "E-mail já cadastrado.",
              });
              return;
            }
            toast.error(error.error.message);
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  {...field}
                  required
                  className="w-full pl-4 py-5 bg-white border border-pink-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...field}
                  required
                  className="w-full pl-4 py-5 bg-white/60 border border-pink-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
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
                    placeholder="Digite sua senha"
                    {...field}
                    required
                    className="w-full pl-4 pr-10 py-5 bg-white/60 border border-pink-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-5 text-slate-600 hover:text-rose-500 transition"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <div className="relative flex items-center">
                <FormControl className="flex-grow">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    {...field}
                    required
                    className="w-full pl-4 pr-10 py-5 bg-white/60 border border-pink-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:bg-white/90 focus:border-rose-300 transition-all duration-300 outline-none shadow-sm text-sm"
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 text-slate-600 hover:text-rose-500 transition"
                  aria-label={
                    showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white md:py-6 py-5 px-4 rounded-2xl font-medium  transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gray-400/40  hover:shadow-gray-600/50 flex items-center justify-center gap-2 group mt-5 ${
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
              Cadastrar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
