import z from "zod";

export type authFormSchema = z.infer<typeof authSchema>

export const authSchema = z.object({
    email: z.email('E-mail é obrigatório'),
    password: z.string('Senha é obrigatória')
})