import { Request, Response } from "express"
import { UserDatabase } from "../database/UserDatabase"
import { UserDB, UserDBPost } from "../types"
import { User } from "../models/User"
import { UserBusiness } from "../business/UserBusiness"

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

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }


    public postUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password } = req.body

            const input:any = {
                id,
                name,
                email, 
                password
            }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.postUser(input)
            
            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}