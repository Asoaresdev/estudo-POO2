import { Request, Response } from "express"
// import { UserDatabase } from "../database/UserDatabase"
// import { UserDB, UserDBPost } from "../types"
// import { User } from "../models/User"
import { UserBusiness } from "../business/UserBusiness"
import { BaseError } from "../errors/BaseError"
import { CreateUserSchema } from "../dtos/createUserDto"
import { ZodError } from "zod"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const userName = req.query.userId as string | undefined
            const input = {
                userName
            }
            const userBusiness = new UserBusiness()
            const output = await userBusiness.getUsers(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public postUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password } = req.body

            const input = CreateUserSchema.parse({
                id: id,
                name: name,
                email: email,
                password: password
              })
        
            // const input:any = {
            //     id,
            //     name,
            //     email, 
            //     password
            // }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.postUser(input)
            
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}