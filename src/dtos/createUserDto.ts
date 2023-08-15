import z from "zod"

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        createdAt: string
    }
}

export const CreateUserSchema = z.object({
    id: z.string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string"
      }).min(1),
    name: z.string({
        required_error: "'nome' é obrigatório",
        invalid_type_error: "'nome' deve ser do tipo string"
      }).min(2),
    email: z.string({
        required_error: "'email' é obrigatório",
        invalid_type_error: "'email' deve ser do tipo string"
      }).email(),
    password: z.string({
        required_error: "'password' é obrigatório",
        invalid_type_error: "'password' deve ser do tipo string"
      }).min(6, "'password' deve possuir no mínimo 6 caracteres")
}).transform(data => data as CreateUserInputDTO)