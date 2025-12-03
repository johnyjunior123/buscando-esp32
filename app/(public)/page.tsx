'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, authSchema } from "@/types/auth.schema";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<authFormSchema>({
    resolver: zodResolver(authSchema)
  });

  const { handleLogin, isPending } = useLogin();

  return (
    <main className="w-full h-screen flex bg-[#121214] text-white overflow-hidden">
      <section className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="https://pub-28df11c92fbd4e4fb6da4ea983d8de1c.r2.dev/monitoramento.jpg"
          alt="Penedo Monitoramento"
          fill
          className="object-cover"
          priority
        />
      </section>
      <section className="w-full md:w-1/2 h-full flex items-center justify-center px-8">
        <div className="w-full max-w-sm space-y-10">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Acessar conta</h1>
            <p className="text-gray-400 text-sm">Faça login para continuar</p>
          </header>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">E-mail</label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Digite seu e-mail"
                className="
                  bg-[#202024]
                  border-[#29292e]
                  text-white
                  rounded-md
                  py-3
                  placeholder:text-gray-500
                  focus-visible:ring-2 
                  focus-visible:ring-[#8257e5]
                  focus-visible:border-[#8257e5]
                  selection:bg-[#8257e5] selection:text-white
                  transition-all
                "
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Senha</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="Digite sua senha"
                className="
                  bg-[#202024]
                  border-[#29292e]
                  text-white
                  rounded-md
                  py-3
                  placeholder:text-gray-500
                  focus-visible:ring-2 
                  focus-visible:ring-[#8257e5]
                  focus-visible:border-[#8257e5]
                  selection:bg-[#8257e5] selection:text-white
                  transition-all
                "
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>
            {/* <div className="flex justify-end -mt-3">
              <Link
                href="/forgot-password"
                className="
                  text-sm text-purple-400 
                  hover:text-[#8257e5] 
                  transition-colors
                "
              >
                Esqueci minha senha
              </Link>
            </div> */}
            <button
              type="submit"
              disabled={isPending}
              className={`
                w-full py-3 font-semibold rounded-md 
                flex items-center justify-center 
                transition-all duration-200
                ${isPending
                  ? "bg-[#8257e5]/60 cursor-not-allowed"
                  : "bg-[#8257e5] hover:bg-[#6f48d5]"}
              `}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Carregando…
                </div>
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
