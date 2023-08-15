import z from "zod"

export interface CreateAccountInputDTO {
    id: string,
    ownerId: string
}
export interface CreateAccountOutputDTO {
    message: string,
    account :{
        id: string,
        balance: number,
        ownerId: string,
        createdAt:string
    }
}

export const CreateAccountSchema = z.object({
    id: z.string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string"
      }).min(3, "Deve conter 3 caracteres"),
      ownerId: z.string({
        required_error: "'id do usuario' é obrigatório",
        invalid_type_error: "'ownerId' deve ser do tipo string"
      }).min(3, "Deve conter 3 caracteres"),

}).transform(data => data as CreateAccountInputDTO)