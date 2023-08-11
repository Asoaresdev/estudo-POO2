import { Request, Response } from "express"
// import { AccountDatabase } from "../database/AccountDatabase"

// import { Account } from "../models/Account"
// import { AccountDB } from "../types"
import { AccountBusiness } from "../business/AccountBusiness"

export class AccountController {
    public getAccounts = async (req: Request, res: Response) => {
        try {
      
            const accountBusiness = new AccountBusiness()
            const output = await  accountBusiness.getAccounts()

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const input:any = {
                id
            }
           
            const accountBusiness = new AccountBusiness()
            const output = await accountBusiness.getBalance(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public postAccount = async(req:Request, res:Response) => {
        try {
            const { id, ownerId } = req.body
            const input = {
                id,
                ownerId
            }
    
            const accountBusiness = new AccountBusiness()
            const output = await accountBusiness.createAccount(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (res.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editAccount = async(req:Request, res:Response) => {
        try {
            const id = req.params.id
            const value = req.body.value

            const input = {
                id,
                value
            }
            
            const accountBusiness = new AccountBusiness()
            const output = await accountBusiness.editAcccount(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (res.statusCode === 200) {
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