import z from "zod"

export interface EditAccountInputDTO {
    id: string,
    value: number
}

export interface EditAccountOutputDTO {
    message: string,
    account: {
        id: string,
        balance: number,
        ownerId: string,
        createdAt: string
    }
}

export const EditAccountSchema = z.object({
    id: z.string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string"
    }).min(3, "Deve conter 3 caracteres"),
    value: z.number({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo number"
    })
}) 