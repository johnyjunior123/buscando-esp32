'use client';

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, authSchema } from "@/types/auth.schema";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<authFormSchema>({
    resolver: zodResolver(authSchema)
  })
  const { handleLogin, isPending } = useLogin()

  return (
    <main className="w-full h-screen flex bg-black text-white">
      <section className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="https://pub-28df11c92fbd4e4fb6da4ea983d8de1c.r2.dev/monitoramento.jpg"
          alt="Penedo Monitoramento"
          fill
          className="object-cover"
          priority
        />
      </section>
      <section className="w-full md:w-1/2 h-full flex items-center justify-center p-10">
        <div className="w-full max-w-sm space-y-8">
          <header className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">Acessar conta</h1>
            <p className="text-gray-400 text-sm">
              Faça login para continuar
            </p>
          </header>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                E-mail
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder="Digite seu e-mail"
                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Senha
              </label>
              <Input
                type="password"
                {...register('password')}
                placeholder="Digite sua senha"
                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-white"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              className={
                "cursor-pointer w-full font-semibold py-3 rounded transition-all duration-200 flex items-center justify-center " +
                (isPending ? "bg-blue-600/80 cursor-not-allowed opacity-80" : "bg-blue-600 hover:bg-blue-700 text-white")
              }
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span className="sr-only">Carregando...</span>
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
